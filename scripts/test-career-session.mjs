import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const values = new Map();
const events = [];
const sessionStorage = {
	getItem: (key) => values.get(key) ?? null,
	setItem: (key, value) => values.set(key, value),
	removeItem: (key) => values.delete(key)
};
const window = { dispatchEvent: (event) => events.push(event.type) };
const env = { VITE_CAREER_API_URL: 'https://api.example.test' };
const context = {
	window, sessionStorage, env, Date, atob, btoa, URLSearchParams,
	Event: class { constructor(type) { this.type = type; } },
	fetch: async () => ({ ok: false, status: 401 }),
	console
};

function load(path, imports = '') {
	const source = readFileSync(new URL(path, import.meta.url), 'utf8')
		.replace("import { browser } from '$app/environment';", 'const browser = true;')
		.replace("import { demoJobs } from './demo';", 'const demoJobs = [];')
		.replace("import { expireSession, token } from './auth';", imports)
		.replaceAll('import.meta.env', 'env');
	const code = ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
	}).outputText;
	const module = { exports: {} };
	runInNewContext(code, { ...context, module, exports: module.exports });
	return module.exports;
}

function jwt(exp) {
	return `header.${btoa(JSON.stringify({ exp })).replaceAll('=', '')}.signature`;
}

const auth = load('../src/lib/career/auth.ts');
values.set('career_id_token', jwt(Math.floor(Date.now() / 1000) - 1));
values.set('career_access_token', 'old-access-token');
assert.equal(auth.token(), null);
assert.equal(values.has('career_id_token'), false);
assert.equal(values.has('career_access_token'), false);
assert.deepEqual(events, ['career-session-expired']);

values.set('career_id_token', jwt(Math.floor(Date.now() / 1000) + 3600));
assert.equal(typeof auth.token(), 'string');
assert.equal(events.length, 1);

// The API module uses the same auth instance and browser storage.
const apiSource = readFileSync(new URL('../src/lib/career/api.ts', import.meta.url), 'utf8')
	.replace("import { demoJobs } from './demo';", 'const demoJobs = [];')
	.replace("import { expireSession, token } from './auth';", 'const { expireSession, token } = auth;')
	.replaceAll('import.meta.env', 'env');
const apiCode = ts.transpileModule(apiSource, {
	compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const apiModule = { exports: {} };
runInNewContext(apiCode, { ...context, auth, module: apiModule, exports: apiModule.exports });
await assert.rejects(apiModule.exports.request('/jobs'), /session has expired/);
assert.equal(values.has('career_id_token'), false);
assert.equal(events.length, 2);

values.set('career_id_token', jwt(Math.floor(Date.now() / 1000) + 3600));
const failureContext = {
	...context, auth,
	fetch: async () => ({ ok: false, status: 500, statusText: 'Server Error',
		json: async () => ({ message: 'Database unavailable' }) }),
	module: { exports: {} }
};
failureContext.exports = failureContext.module.exports;
runInNewContext(apiCode, failureContext);
await assert.rejects(failureContext.module.exports.request('/jobs'), /Database unavailable/);
assert.equal(values.has('career_id_token'), true);

console.log('Career session expiry, 401 handling, and non-auth error details passed.');
