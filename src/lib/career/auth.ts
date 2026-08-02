import { browser } from '$app/environment';

const domain = import.meta.env.VITE_COGNITO_DOMAIN || '';
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID || '';
const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI || '';
const verifierKey = 'career_pkce_verifier';
const stateKey = 'career_oauth_state';

function encode(value: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(value))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function isAuthConfigured(): boolean {
	return Boolean(domain && clientId && redirectUri);
}

export function token(): string | null {
	return browser ? sessionStorage.getItem('career_id_token') : null;
}

export async function login(): Promise<void> {
	if (!browser || !isAuthConfigured()) return;
	const verifier = encode(crypto.getRandomValues(new Uint8Array(48)).buffer);
	const challenge = encode(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
	const state = encode(crypto.getRandomValues(new Uint8Array(32)).buffer);
	sessionStorage.setItem(verifierKey, verifier);
	sessionStorage.setItem(stateKey, state);
	const params = new URLSearchParams({
		client_id: clientId,
		response_type: 'code',
		scope: 'openid email profile',
		redirect_uri: redirectUri,
		code_challenge_method: 'S256',
		code_challenge: challenge,
		state
	});
	window.location.assign(`${domain}/oauth2/authorize?${params}`);
}

export async function completeLogin(code: string, returnedState: string | null): Promise<void> {
	const verifier = sessionStorage.getItem(verifierKey);
	const expectedState = sessionStorage.getItem(stateKey);
	if (!verifier) throw new Error('The sign-in session expired. Please try again.');
	if (!returnedState || !expectedState || returnedState !== expectedState) {
		sessionStorage.removeItem(verifierKey);
		sessionStorage.removeItem(stateKey);
		throw new Error('The sign-in response could not be verified. Please try again.');
	}
	const response = await fetch(`${domain}/oauth2/token`, {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ grant_type: 'authorization_code', client_id: clientId, code, redirect_uri: redirectUri, code_verifier: verifier })
	});
	if (!response.ok) throw new Error('Sign-in could not be completed.');
	const payload = await response.json();
	sessionStorage.setItem('career_id_token', payload.id_token);
	sessionStorage.setItem('career_access_token', payload.access_token);
	sessionStorage.removeItem(verifierKey);
	sessionStorage.removeItem(stateKey);
}

export function logout(): void {
	if (!browser) return;
	sessionStorage.removeItem('career_id_token');
	sessionStorage.removeItem('career_access_token');
	sessionStorage.removeItem(verifierKey);
	sessionStorage.removeItem(stateKey);
	if (isAuthConfigured()) {
		const params = new URLSearchParams({ client_id: clientId, logout_uri: redirectUri });
		window.location.assign(`${domain}/logout?${params}`);
	}
}
