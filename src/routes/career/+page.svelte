<script lang="ts">
	import { onMount } from 'svelte';
	import { completeLogin, isAuthConfigured, login, logout, token } from '$lib/career/auth';
	import {
		getApplicationPack,
		isDemoMode,
		listJobs,
		prepareApplication,
		updateJob
	} from '$lib/career/api';
	import SystemMetrics from '$lib/career/SystemMetrics.svelte';
	import type { ApplicationPack, Job, JobStatus } from '$lib/career/types';

	type View = 'recommended' | 'shortlisted' | 'applications' | 'archived' | 'system';
	const views: Array<{ id: View; label: string }> = [
		{ id: 'recommended', label: 'Recommendations' },
		{ id: 'shortlisted', label: 'Shortlist' },
		{ id: 'applications', label: 'Applications' },
		{ id: 'archived', label: 'Archived' },
		{ id: 'system', label: 'System' }
	];
	let jobs: Job[] = [];
	let selected: Job | null = null;
	let view: View = 'recommended';
	let loading = true;
	let working = '';
	let packLoadingJobId = '';
	let error = '';
	let pack: ApplicationPack | null = null;
	let authenticated = isDemoMode() || Boolean(token());

	$: visibleJobs = jobs.filter((job) => {
		if (view === 'recommended') return job.status === 'recommended';
		if (view === 'shortlisted')
			return job.status === 'shortlisted' || job.status === 'ready_to_apply';
		if (view === 'applications')
			return ['preparing', 'applied', 'recruiter_response', 'interview', 'offer'].includes(
				job.status
			);
		if (view === 'archived') return ['dismissed', 'rejected', 'withdrawn'].includes(job.status);
		return false;
	});
	$: pipelineCount = jobs.filter((job) =>
		['applied', 'recruiter_response', 'interview', 'offer'].includes(job.status)
	).length;

	onMount(async () => {
		try {
			const params = new URLSearchParams(window.location.search);
			const code = params.get('code');
			const requested = params.get('job');
			if (code && isAuthConfigured()) {
				// Authorization codes are short-lived credentials; remove them from the
				// visible URL and browser history before attempting the exchange.
				window.history.replaceState({}, '', '/career');
				await completeLogin(code, params.get('state'));
				authenticated = true;
			}
			if (authenticated) {
				jobs = await listJobs();
				selected = (requested && jobs.find((job) => job.id === requested)) || jobs[0] || null;
				if (selected) await loadExistingPack(selected);
			}
		} catch (cause) {
			error = cause instanceof Error ? cause.message : 'The dashboard could not be loaded.';
		} finally {
			loading = false;
		}
	});

	function salary(job: Job): string {
		const { minimum_gbp: minimum, maximum_gbp: maximum } = job.salary;
		if (!minimum && !maximum) return 'Salary unresolved';
		if (minimum === maximum || !maximum) return `£${(minimum || maximum)?.toLocaleString()}`;
		return `£${minimum?.toLocaleString()}–£${maximum.toLocaleString()}`;
	}

	function salaryBasis(job: Job): string {
		return `${job.salary.inferred ? 'Estimated' : 'Advertised'} · ${
			job.salary.confidence
		} confidence`;
	}

	async function transition(job: Job, status: JobStatus, reason?: string) {
		working = `${job.id}:${status}`;
		error = '';
		try {
			const updated = await updateJob(job, status, reason);
			jobs = jobs.map((item) => (item.id === updated.id ? updated : item));
			selected = updated;
		} catch (cause) {
			error = cause instanceof Error ? cause.message : 'The job could not be updated.';
		} finally {
			working = '';
		}
	}

	async function prepare(job: Job) {
		working = `${job.id}:prepare`;
		error = '';
		try {
			pack = await prepareApplication(job);
			const updated: Job = { ...job, status: 'ready_to_apply' };
			jobs = jobs.map((item) => (item.id === job.id ? updated : item));
			selected = updated;
		} catch (cause) {
			error =
				cause instanceof Error ? cause.message : 'Application materials could not be prepared.';
		} finally {
			working = '';
		}
	}

	function transitionSelected(status: JobStatus, reason?: string) {
		if (selected) void transition(selected, status, reason);
	}

	function prepareSelected() {
		if (selected) void prepare(selected);
	}

	async function loadExistingPack(job: Job) {
		pack = null;
		if (job.status !== 'ready_to_apply') return;
		packLoadingJobId = job.id;
		try {
			const loadedPack = await getApplicationPack(job);
			if (selected?.id === job.id) pack = loadedPack;
		} catch (cause) {
			if (selected?.id === job.id) {
				error =
					cause instanceof Error ? cause.message : 'Application materials could not be loaded.';
			}
		} finally {
			if (packLoadingJobId === job.id) packLoadingJobId = '';
		}
	}

	async function choose(job: Job) {
		selected = job;
		pack = null;
		error = '';
		const url = new URL(window.location.href);
		url.searchParams.set('job', job.id);
		window.history.replaceState({}, '', url);
		await loadExistingPack(job);
	}
</script>

<svelte:head>
	<title>Private — Behrad Zabihi</title>
	<meta name="description" content="A private section of Behrad Zabihi's website." />
</svelte:head>

{#if !authenticated && !loading}
	<section class="career-auth shell">
		<div class="auth-mark">BZ<span /></div>
		<p>BEHRAD'S PRIVATE CORNER</p>
		<h1>Not Behrad?<br /><em>This bit isn't for you ;)</em></h1>
		<span>Nothing personal — the rest of the site is all yours.</span>
		{#if error}<div class="auth-error" role="alert">{error}</div>{/if}
		<button on:click={login}>I'm Behrad — sign in</button>
	</section>
{:else}
	<section class="career-shell">
		<header class="career-header shell">
			<div>
				<p>CAREER OS <span>/</span> UK DATA + AI</p>
				<h1>Opportunity board</h1>
				<span>Evidence-backed roles worth your attention.</span>
			</div>
			<div class="run-status">
				<i />
				<div>
					<strong>{isDemoMode() ? 'Demo dataset' : 'Pipeline active'}</strong><span
						>Runs every other day</span
					>
				</div>
				{#if isAuthConfigured()}<button on:click={logout}>Sign out</button>{/if}
			</div>
		</header>

		<div class="stats shell">
			<article>
				<span>01 / MATCHED</span><strong
					>{jobs.filter((job) => job.status === 'recommended').length}</strong
				>
				<p>current recommendations</p>
			</article>
			<article>
				<span>02 / SHORTLIST</span><strong
					>{jobs.filter((job) => ['shortlisted', 'ready_to_apply'].includes(job.status))
						.length}</strong
				>
				<p>roles under review</p>
			</article>
			<article>
				<span>03 / PIPELINE</span><strong>{pipelineCount}</strong>
				<p>active applications</p>
			</article>
			<article>
				<span>04 / TARGET</span><strong>£60k+</strong>
				<p>normal salary floor</p>
			</article>
		</div>

		<nav class="view-tabs shell" aria-label="Career views">
			{#each views as item}
				<button class:active={view === item.id} on:click={() => (view = item.id)}
					>{item.label}</button
				>
			{/each}
		</nav>

		{#if error}<div class="error-banner shell" role="alert">{error}</div>{/if}

		{#if view === 'system'}
			<div class="shell"><SystemMetrics /></div>
		{:else if loading}
			<div class="loading shell"><i /><span>Loading recommendations</span></div>
		{:else}
			<div class="career-grid shell">
				<div class="job-list" aria-label="Jobs">
					{#if visibleJobs.length === 0}
						<div class="empty">
							<strong>Nothing here yet.</strong><span
								>Move a recommendation into this stage to track it.</span
							>
						</div>
					{/if}
					{#each visibleJobs as job, index}
						<button
							class:selected={selected?.id === job.id}
							class="job-row"
							on:click={() => void choose(job)}
						>
							<div class="job-rank">{String(index + 1).padStart(2, '0')}</div>
							<div class="job-core">
								<div class="job-topline">
									<span>{job.company}</span><small>{job.workplace}</small>
								</div>
								<h2>{job.title}</h2>
								<p>{job.location} <i>·</i> {salary(job)}</p>
								<div class="skill-line">
									{#each job.skills.slice(0, 4) as skill}<span>{skill}</span>{/each}
								</div>
							</div>
							<div class="job-score">
								<strong>{Math.round(job.score.overall)}</strong><span>FIT</span>
							</div>
						</button>
					{/each}
				</div>

				{#if selected}
					<aside class="job-detail">
						<div class="detail-head">
							<div>
								<p>{selected.company} <span>/</span> {selected.source}</p>
								<h2>{selected.title}</h2>
								<small>{selected.location} · {selected.workplace}</small>
							</div>
							<div class="hero-score">
								<strong>{Math.round(selected.score.overall)}</strong><span>OVERALL FIT</span>
							</div>
						</div>

						<div class="action-row">
							{#if selected.status === 'recommended'}
								<button
									class="primary"
									disabled={Boolean(working)}
									on:click={() => transitionSelected('shortlisted')}>Shortlist</button
								>
								<button
									disabled={Boolean(working)}
									on:click={() => transitionSelected('dismissed', 'Not pursuing')}>Dismiss</button
								>
							{:else if selected.status === 'shortlisted'}
								<button class="primary" disabled={Boolean(working)} on:click={prepareSelected}
									>{working.includes('prepare') ? 'Preparing…' : 'Prepare application'}</button
								>
								<button
									disabled={Boolean(working)}
									on:click={() => transitionSelected('recommended')}>Return</button
								>
							{:else if selected.status === 'ready_to_apply'}
								<a class="primary" href={selected.apply_url} target="_blank" rel="noreferrer"
									>Apply on employer site ↗</a
								>
								<button disabled={Boolean(working)} on:click={() => transitionSelected('applied')}
									>Mark applied</button
								>
							{:else if selected.status === 'applied'}
								<button
									class="primary"
									disabled={Boolean(working)}
									on:click={() => transitionSelected('interview')}>Interview secured</button
								>
								<button disabled={Boolean(working)} on:click={() => transitionSelected('rejected')}
									>Rejected</button
								>
							{:else if selected.status === 'interview'}
								<button
									class="primary"
									disabled={Boolean(working)}
									on:click={() => transitionSelected('offer')}>Offer received</button
								>
								<button disabled={Boolean(working)} on:click={() => transitionSelected('rejected')}
									>Rejected</button
								>
							{/if}
						</div>

						{#if packLoadingJobId === selected.id}
							<section class="pack-panel pack-loading" aria-live="polite">
								<i /><span>Loading your tailored CV and cover letter…</span>
							</section>
						{:else if pack && pack.job_id === selected.id}
							<section class="pack-panel">
								<p>APPLICATION PACK READY</p>
								<h3>{pack.cv_headline}</h3>
								<span>{pack.cv_summary}</span>
								<div>
									{#each Object.entries(pack.download_urls) as file}<a href={file[1]}
											>{file[0].replace('_', ' ')} ↗</a
										>{/each}
								</div>
								<small>Review every document before submitting.</small>
							</section>
						{/if}

						<section class="salary-panel">
							<div>
								<span>COMPENSATION</span><strong>{salary(selected)}</strong>
								<p>{salaryBasis(selected)}</p>
							</div>
							<div>
								<span>WORKING PATTERN</span><strong>{selected.workplace}</strong>
								<p>{selected.location}</p>
							</div>
						</section>

						<section class="score-grid">
							{#each [['Attainability', selected.score.attainability], ['Career gain', selected.score.career_gain], ['Remuneration', selected.score.remuneration], ['Location', selected.score.location]] as metric}
								<div>
									<span>{metric[0]}</span><strong>{Math.round(Number(metric[1]))}</strong><i
										><b style={`width:${metric[1]}%`} /></i
									>
								</div>
							{/each}
						</section>

						<section class="detail-section">
							<p>WHY THIS MADE THE CUT</p>
							{#each selected.match_reasons as reason}<div class="reason">
									<i>✓</i><span>{reason}</span>
								</div>{/each}
						</section>
						{#if selected.gaps.length}<section class="detail-section">
								<p>RISKS TO ADDRESS</p>
								{#each selected.gaps as gap}<div class="gap"><i>!</i><span>{gap}</span></div>{/each}
							</section>{/if}
						<section class="detail-section">
							<p>YOUR SUPPORTING EVIDENCE</p>
							<div class="evidence-list">
								{#each selected.matched_evidence_ids as evidence}<span>{evidence}</span>{/each}
							</div>
						</section>
						<section class="detail-section">
							<p>ROLE REQUIREMENTS</p>
							<ul>
								{#each selected.requirements as requirement}<li>{requirement}</li>{/each}
							</ul>
						</section>
						<section class="detail-section">
							<p>COMPANY & ROLE CONTEXT</p>
							<div class="context-grid">
								{#each Object.entries(selected.company_context) as context}<div>
										<span>{context[0].replace('_', ' ')}</span><strong>{String(context[1])}</strong>
									</div>{/each}
							</div>
						</section>
						<section class="detail-section">
							<p>FULL ADVERT</p>
							<div class="description">{selected.description}</div>
							<a class="source-link" href={selected.source_url} target="_blank" rel="noreferrer"
								>View original source ↗</a
							>
						</section>
					</aside>
				{:else}<aside class="job-detail empty-detail">
						Select a role to inspect its evidence.
					</aside>{/if}
			</div>
		{/if}
	</section>
{/if}

<style>
	:global(body) {
		background: #090b0f;
	}
	.career-shell {
		min-height: 100vh;
		padding: 132px 0 100px;
		background: radial-gradient(circle at 85% 0, rgba(124, 92, 255, 0.12), transparent 24%), #090b0f;
	}
	.career-header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 30px;
	}
	.career-header p,
	.detail-head p,
	.detail-section > p,
	.pack-panel > p {
		margin: 0 0 10px;
		color: var(--lime);
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
	}
	.career-header p span,
	.detail-head p span {
		margin: 0 7px;
		color: var(--violet);
	}
	.career-header h1 {
		margin: 0;
		font-size: clamp(43px, 5vw, 70px);
		line-height: 1;
		letter-spacing: -0.06em;
	}
	.career-header > div > span {
		display: block;
		margin-top: 14px;
		color: var(--muted);
		font-size: 13px;
	}
	.run-status {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 13px 15px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--panel);
	}
	.run-status > i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--lime);
		box-shadow: 0 0 12px var(--lime);
	}
	.run-status div {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.run-status strong {
		font-size: 10px;
	}
	.run-status span {
		color: var(--muted);
		font-size: 8px;
	}
	.run-status button {
		margin-left: 10px;
		padding: 6px 8px;
		border: 0;
		background: transparent;
		color: #858b96;
		font-size: 9px;
		cursor: pointer;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 55px;
		border: 1px solid var(--line);
		border-radius: 16px;
		overflow: hidden;
	}
	.stats article {
		min-height: 135px;
		padding: 22px;
		border-right: 1px solid var(--line);
		background: #0e1117;
	}
	.stats article:last-child {
		border: 0;
	}
	.stats span {
		color: #626875;
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.1em;
	}
	.stats strong {
		display: block;
		margin-top: 19px;
		color: var(--lime);
		font-size: 28px;
		letter-spacing: -0.04em;
	}
	.stats p {
		margin: 3px 0 0;
		color: #7d838e;
		font-size: 9px;
	}
	.view-tabs {
		display: flex;
		gap: 4px;
		margin-top: 25px;
		border-bottom: 1px solid var(--line);
	}
	.view-tabs button {
		position: relative;
		padding: 15px 17px;
		border: 0;
		background: transparent;
		color: #737986;
		font-size: 11px;
		cursor: pointer;
	}
	.view-tabs button.active {
		color: white;
	}
	.view-tabs button.active::after {
		position: absolute;
		right: 12px;
		bottom: -1px;
		left: 12px;
		height: 2px;
		background: var(--lime);
		content: '';
	}
	.career-grid {
		display: grid;
		grid-template-columns: minmax(360px, 0.82fr) minmax(0, 1.18fr);
		gap: 16px;
		align-items: start;
		margin-top: 20px;
	}
	.job-list,
	.job-detail {
		border: 1px solid var(--line);
		border-radius: 16px;
		background: #0d1015;
		overflow: hidden;
	}
	.job-list {
		position: sticky;
		top: 92px;
		max-height: calc(100vh - 115px);
		overflow-y: auto;
	}
	.job-row {
		display: grid;
		grid-template-columns: 30px minmax(0, 1fr) 54px;
		gap: 13px;
		width: 100%;
		padding: 20px 17px;
		border: 0;
		border-bottom: 1px solid var(--line);
		background: transparent;
		color: inherit;
		text-align: left;
		cursor: pointer;
	}
	.job-row:last-child {
		border: 0;
	}
	.job-row:hover,
	.job-row.selected {
		background: #141820;
	}
	.job-row.selected {
		box-shadow: inset 3px 0 var(--lime);
	}
	.job-rank {
		padding-top: 2px;
		color: #505661;
		font-family: var(--font-mono);
		font-size: 9px;
	}
	.job-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
	.job-topline > span {
		color: var(--violet);
		font-size: 10px;
		font-weight: 700;
	}
	.job-topline small {
		padding: 3px 5px;
		border-radius: 4px;
		background: rgba(216, 255, 92, 0.08);
		color: #b9c192;
		font-family: var(--font-mono);
		font-size: 7px;
		text-transform: uppercase;
	}
	.job-core h2 {
		margin: 7px 0 4px;
		font-size: 17px;
		letter-spacing: -0.03em;
	}
	.job-core > p {
		margin: 0;
		color: #7d8490;
		font-size: 9px;
	}
	.job-core p i {
		margin: 0 5px;
		color: #474d57;
		font-style: normal;
	}
	.skill-line {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 11px;
	}
	.skill-line span,
	.evidence-list span {
		padding: 4px 6px;
		border: 1px solid var(--line);
		border-radius: 5px;
		color: #8d939e;
		font-family: var(--font-mono);
		font-size: 7px;
	}
	.job-score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 1px solid rgba(216, 255, 92, 0.2);
		border-radius: 50%;
	}
	.job-score strong {
		color: var(--lime);
		font-size: 16px;
	}
	.job-score span {
		color: #68705c;
		font-family: var(--font-mono);
		font-size: 6px;
	}
	.job-detail {
		padding: 27px;
	}
	.detail-head {
		display: flex;
		justify-content: space-between;
		gap: 30px;
	}
	.detail-head h2 {
		max-width: 560px;
		margin: 0;
		font-size: clamp(28px, 3.5vw, 43px);
		line-height: 1.05;
		letter-spacing: -0.05em;
	}
	.detail-head small {
		display: block;
		margin-top: 9px;
		color: #777e89;
		font-size: 10px;
	}
	.hero-score {
		display: flex;
		min-width: 78px;
		height: 78px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(216, 255, 92, 0.24);
		border-radius: 50%;
		background: rgba(216, 255, 92, 0.03);
	}
	.hero-score strong {
		color: var(--lime);
		font-size: 27px;
	}
	.hero-score span {
		color: #7a806a;
		font-family: var(--font-mono);
		font-size: 6px;
	}
	.action-row {
		display: flex;
		gap: 8px;
		margin: 25px 0;
	}
	.action-row button,
	.action-row a,
	.career-auth button {
		display: inline-flex;
		min-height: 42px;
		align-items: center;
		justify-content: center;
		padding: 0 14px;
		border: 1px solid #303640;
		border-radius: 8px;
		background: #171b22;
		color: #c9cdd4;
		font-size: 10px;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
	}
	.action-row .primary,
	.career-auth button {
		border-color: var(--lime);
		background: var(--lime);
		color: #090b0f;
	}
	.action-row button:disabled {
		opacity: 0.5;
		cursor: wait;
	}
	.salary-panel {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--line);
		border-radius: 12px;
		overflow: hidden;
	}
	.salary-panel > div {
		padding: 17px;
	}
	.salary-panel > div + div {
		border-left: 1px solid var(--line);
	}
	.salary-panel span,
	.score-grid span,
	.context-grid span {
		color: #676e7a;
		font-family: var(--font-mono);
		font-size: 7px;
		letter-spacing: 0.1em;
	}
	.salary-panel strong {
		display: block;
		margin-top: 9px;
		color: var(--lime);
		font-size: 18px;
		text-transform: capitalize;
	}
	.salary-panel p {
		margin: 4px 0 0;
		color: #7d8490;
		font-size: 8px;
	}
	.score-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 7px;
		margin-top: 8px;
	}
	.score-grid > div {
		padding: 13px;
		border: 1px solid var(--line);
		border-radius: 9px;
		background: #11151b;
	}
	.score-grid strong {
		float: right;
		color: white;
		font-size: 13px;
	}
	.score-grid i {
		display: block;
		width: 100%;
		height: 2px;
		margin-top: 12px;
		background: #292e37;
	}
	.score-grid b {
		display: block;
		height: 2px;
		background: var(--violet);
	}
	.detail-section {
		margin-top: 27px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	.reason,
	.gap {
		display: grid;
		grid-template-columns: 22px 1fr;
		gap: 8px;
		margin-top: 9px;
		color: #aeb3bd;
		font-size: 11px;
		line-height: 1.5;
	}
	.reason i,
	.gap i {
		display: grid;
		place-items: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: rgba(216, 255, 92, 0.09);
		color: var(--lime);
		font-size: 8px;
		font-style: normal;
	}
	.gap i {
		background: rgba(255, 181, 92, 0.1);
		color: #ffb55c;
	}
	.evidence-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.evidence-list span {
		color: #bfb3ff;
		border-color: rgba(124, 92, 255, 0.28);
		background: rgba(124, 92, 255, 0.05);
	}
	.detail-section ul {
		margin: 0;
		padding-left: 17px;
		color: #a6abb5;
		font-size: 11px;
		line-height: 1.6;
	}
	.detail-section li + li {
		margin-top: 6px;
	}
	.context-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 7px;
	}
	.context-grid > div {
		padding: 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
	}
	.context-grid span {
		display: block;
		text-transform: uppercase;
	}
	.context-grid strong {
		display: block;
		margin-top: 7px;
		color: #afb4bd;
		font-size: 10px;
		line-height: 1.4;
	}
	.description {
		max-height: 220px;
		overflow-y: auto;
		padding-right: 8px;
		color: #969ca8;
		font-size: 11px;
		line-height: 1.7;
	}
	.source-link {
		display: inline-block;
		margin-top: 13px;
		color: var(--lime);
		font-size: 9px;
		text-decoration: none;
	}
	.pack-panel {
		margin: 0 0 8px;
		padding: 20px;
		border: 1px solid rgba(216, 255, 92, 0.26);
		border-radius: 11px;
		background: rgba(216, 255, 92, 0.035);
	}
	.pack-panel h3 {
		margin: 0;
		font-size: 17px;
	}
	.pack-panel > span {
		display: block;
		margin-top: 8px;
		color: #919795;
		font-size: 10px;
		line-height: 1.5;
	}
	.pack-panel div {
		display: flex;
		gap: 8px;
		margin-top: 15px;
	}
	.pack-panel a {
		padding: 8px 10px;
		border-radius: 6px;
		background: var(--lime);
		color: #090b0f;
		font-size: 8px;
		font-weight: 800;
		text-decoration: none;
		text-transform: capitalize;
	}
	.pack-panel small {
		display: block;
		margin-top: 12px;
		color: #71776d;
		font-size: 8px;
	}
	.pack-loading {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.pack-loading i {
		width: 16px;
		height: 16px;
		border: 2px solid #303640;
		border-top-color: var(--lime);
		border-radius: 50%;
		animation: spin 800ms linear infinite;
	}
	.pack-loading > span {
		margin: 0;
	}
	.error-banner {
		margin-top: 18px;
		padding: 12px 15px;
		border: 1px solid rgba(255, 96, 96, 0.35);
		border-radius: 9px;
		background: rgba(255, 96, 96, 0.06);
		color: #ffb2b2;
		font-size: 10px;
	}
	.loading,
	.empty {
		display: flex;
		min-height: 220px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #727985;
	}
	.loading i {
		width: 24px;
		height: 24px;
		margin-bottom: 12px;
		border: 2px solid #2a3039;
		border-top-color: var(--lime);
		border-radius: 50%;
		animation: spin 800ms linear infinite;
	}
	.loading span,
	.empty span {
		font-size: 9px;
	}
	.empty strong {
		margin-bottom: 7px;
		color: #b5bac3;
	}
	.empty-detail {
		display: grid;
		min-height: 400px;
		place-items: center;
		color: #707682;
		font-size: 11px;
	}
	.career-auth {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	.auth-mark {
		position: relative;
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border: 1px solid #333945;
		border-radius: 14px;
		font-weight: 800;
	}
	.auth-mark span {
		position: absolute;
		right: 6px;
		bottom: 6px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--lime);
	}
	.career-auth > p {
		margin: 30px 0 12px;
		color: var(--lime);
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
	}
	.career-auth h1 {
		margin: 0;
		font-size: clamp(50px, 7vw, 86px);
		line-height: 0.98;
		letter-spacing: -0.07em;
	}
	.career-auth h1 em {
		color: var(--lime);
		font-style: normal;
	}
	.career-auth > span {
		max-width: 520px;
		margin-top: 24px;
		color: #9298a3;
		font-size: 13px;
		line-height: 1.7;
	}
	.auth-error {
		max-width: 520px;
		margin-top: 18px;
		padding: 12px 15px;
		border: 1px solid rgba(255, 96, 96, 0.35);
		border-radius: 9px;
		background: rgba(255, 96, 96, 0.06);
		color: #ffb2b2;
		font-size: 10px;
	}
	.career-auth button {
		margin-top: 28px;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (max-width: 900px) {
		.career-grid {
			grid-template-columns: 1fr;
		}
		.job-list {
			position: static;
			max-height: 520px;
		}
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.stats article:nth-child(2) {
			border-right: 0;
		}
		.stats article:nth-child(-n + 2) {
			border-bottom: 1px solid var(--line);
		}
	}
	@media (max-width: 620px) {
		.career-shell {
			padding-top: 110px;
		}
		.career-header {
			align-items: flex-start;
			flex-direction: column;
		}
		.run-status {
			width: 100%;
		}
		.stats article {
			min-height: 112px;
			padding: 16px;
		}
		.view-tabs {
			overflow-x: auto;
		}
		.career-grid {
			width: calc(100% - 20px);
		}
		.job-detail {
			padding: 19px;
		}
		.detail-head {
			gap: 12px;
		}
		.hero-score {
			min-width: 62px;
			height: 62px;
		}
		.score-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.context-grid {
			grid-template-columns: 1fr;
		}
		.action-row {
			flex-wrap: wrap;
		}
		.salary-panel {
			grid-template-columns: 1fr;
		}
		.salary-panel > div + div {
			border-top: 1px solid var(--line);
			border-left: 0;
		}
	}
</style>
