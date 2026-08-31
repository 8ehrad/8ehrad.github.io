<script lang="ts">
	import { onMount } from 'svelte';
	import { getSystemMetrics } from './metrics';
	import type { MetricsRange, SystemMetrics } from './metrics';

	const ranges: Array<{ id: MetricsRange; label: string }> = [
		{ id: '24h', label: '24 hours' },
		{ id: '7d', label: '7 days' },
		{ id: '30d', label: '30 days' }
	];
	let range: MetricsRange = '24h';
	let metrics: SystemMetrics | null = null;
	let loading = true;
	let error = '';

	$: maxViews = Math.max(1, ...(metrics?.series.map((point) => point.page_views) || [1]));
	$: chartPoints = (metrics?.series || [])
		.map(
			(point, index, points) =>
				`${points.length === 1 ? 50 : (index / (points.length - 1)) * 100},${
					38 - (point.page_views / maxViews) * 34
				}`
		)
		.join(' ');
	$: totalErrors = metrics
		? metrics.twin.chat_failures +
		  metrics.twin.api_5xx +
		  metrics.career_agent.api_errors +
		  metrics.career_agent.scheduled_errors
		: 0;

	onMount(() => void load());

	async function load(nextRange: MetricsRange = range) {
		range = nextRange;
		loading = true;
		error = '';
		try {
			metrics = await getSystemMetrics(range);
		} catch (cause) {
			error = cause instanceof Error ? cause.message : 'Metrics could not be loaded.';
		} finally {
			loading = false;
		}
	}

	function number(value: number): string {
		return value.toLocaleString('en-GB');
	}

	function duration(value: number): string {
		return value >= 1000 ? `${(value / 1000).toFixed(2)}s` : `${Math.round(value)}ms`;
	}
</script>

<section class="system-board" aria-label="System performance and traffic">
	<header>
		<div>
			<p>SYSTEM / OBSERVABILITY</p>
			<h2>Signals, not guesswork.</h2>
			<span>Private operational health and public-site traffic.</span>
		</div>
		<div class="controls">
			{#each ranges as option}<button
					class:active={range === option.id}
					on:click={() => void load(option.id)}>{option.label}</button
				>{/each}
			<button
				class="refresh"
				disabled={loading}
				on:click={() => void load()}
				aria-label="Refresh metrics">↻</button
			>
		</div>
	</header>

	{#if error}<div class="metrics-error" role="alert">{error}</div>{/if}
	{#if loading && !metrics}<div class="metrics-loading">
			<i /><span>Reading CloudWatch</span>
		</div>{/if}
	{#if metrics}
		<div class="metric-grid primary-metrics">
			<article>
				<span>REAL PAGE VIEWS</span><strong>{number(metrics.traffic.page_views)}</strong><small
					>Browser-rendered public pages</small
				>
			</article>
			<article>
				<span>CDN REQUESTS</span><strong>{number(metrics.traffic.cloudfront_requests)}</strong
				><small>Includes assets and bots</small>
			</article>
			<article>
				<span>TWIN CHATS</span><strong>{number(metrics.twin.chat_requests)}</strong><small
					>Completed user requests</small
				>
			</article>
			<article class:warning={totalErrors > 0}>
				<span>BACKEND FAILURES</span><strong>{number(totalErrors)}</strong><small
					>Across twin and career agent</small
				>
			</article>
		</div>

		<div class="system-grid">
			<section class="panel traffic-panel">
				<div class="panel-heading">
					<div>
						<p>TRAFFIC</p>
						<h3>Public page views</h3>
					</div>
					<small>{range}</small>
				</div>
				<div class="chart" aria-label={`Page view trend over ${range}`}>
					<div class="grid-lines"><i /><i /><i /></div>
					{#if chartPoints}<svg viewBox="0 0 100 40" preserveAspectRatio="none" role="img"
							><polyline points={chartPoints} /></svg
						>{:else}<span>No browser visits recorded yet.</span>{/if}
				</div>
				<div class="traffic-facts">
					<div>
						<span>AVG LOAD</span><strong>{duration(metrics.traffic.average_page_load_ms)}</strong>
					</div>
					<div>
						<span>JS ERRORS</span><strong>{number(metrics.traffic.javascript_errors)}</strong>
					</div>
					<div>
						<span>CDN 5XX</span><strong>{metrics.traffic.cloudfront_5xx_rate.toFixed(2)}%</strong>
					</div>
				</div>
			</section>

			<section class="panel pages-panel">
				<div class="panel-heading">
					<div>
						<p>CONTENT</p>
						<h3>Most-viewed pages</h3>
					</div>
				</div>
				{#if metrics.traffic.top_pages.length}
					<ol>
						{#each metrics.traffic.top_pages as page, index}<li>
								<span><i>{String(index + 1).padStart(2, '0')}</i>{page.path}</span><strong
									>{number(page.views)}</strong
								>
							</li>{/each}
					</ol>
				{:else}<div class="no-pages">
						Traffic will appear a few minutes after the first monitored visit.
					</div>{/if}
			</section>
		</div>

		<div class="section-label"><span>TWIN RUNTIME</span><i /></div>
		<div class="metric-grid runtime-metrics">
			<article>
				<span>RETRIEVAL</span><strong>{duration(metrics.twin.average_retrieval_ms)}</strong><small
					>Mean context lookup</small
				>
			</article>
			<article>
				<span>MODEL</span><strong>{duration(metrics.twin.average_model_ms)}</strong><small
					>Mean Bedrock response</small
				>
			</article>
			<article>
				<span>INPUT / OUTPUT</span><strong
					>{number(metrics.twin.input_tokens)} <em>/</em>
					{number(metrics.twin.output_tokens)}</strong
				><small>Tokens consumed</small>
			</article>
			<article class:warning={metrics.twin.semantic_fallbacks > 0}>
				<span>FALLBACKS</span><strong>{number(metrics.twin.semantic_fallbacks)}</strong><small
					>Semantic retrieval fallbacks</small
				>
			</article>
		</div>

		<footer>
			<span>No analytics cookies. No persistent visitor ID. Career OS visits are excluded.</span
			><small
				>Updated {new Date(metrics.generated_at).toLocaleString('en-GB')} · CloudWatch may lag by several
				minutes.</small
			>
		</footer>
	{/if}
</section>

<style>
	.system-board {
		margin-top: 20px;
	}
	header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 24px;
		padding: 28px;
		border: 1px solid var(--line);
		border-radius: 16px;
		background: linear-gradient(135deg, rgba(124, 92, 255, 0.08), transparent 45%), #0d1015;
	}
	header p,
	.panel-heading p {
		margin: 0 0 8px;
		color: var(--lime);
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.14em;
	}
	header h2 {
		margin: 0;
		font-size: clamp(28px, 4vw, 46px);
		letter-spacing: -0.05em;
	}
	header span {
		display: block;
		margin-top: 8px;
		color: #777e89;
		font-size: 10px;
	}
	.controls {
		display: flex;
		padding: 3px;
		border: 1px solid var(--line);
		border-radius: 9px;
		background: #090c10;
	}
	.controls button {
		padding: 8px 10px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: #777e89;
		font-size: 8px;
		cursor: pointer;
	}
	.controls button.active {
		background: #20252d;
		color: white;
	}
	.controls .refresh {
		color: var(--lime);
		font-size: 14px;
	}
	.controls button:disabled {
		opacity: 0.45;
	}
	.metric-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
		margin-top: 8px;
	}
	.metric-grid article {
		min-height: 124px;
		padding: 19px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: #0d1015;
	}
	.metric-grid article > span {
		color: #626875;
		font-family: var(--font-mono);
		font-size: 7px;
		letter-spacing: 0.11em;
	}
	.metric-grid strong {
		display: block;
		margin-top: 18px;
		color: var(--lime);
		font-size: 25px;
		letter-spacing: -0.04em;
	}
	.metric-grid strong em {
		color: #4d535e;
		font-style: normal;
	}
	.metric-grid small {
		display: block;
		margin-top: 4px;
		color: #737985;
		font-size: 8px;
	}
	.metric-grid article.warning strong {
		color: #ffb55c;
	}
	.system-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(290px, 0.7fr);
		gap: 8px;
		margin-top: 8px;
	}
	.panel {
		min-height: 310px;
		padding: 22px;
		border: 1px solid var(--line);
		border-radius: 14px;
		background: #0d1015;
	}
	.panel-heading {
		display: flex;
		align-items: start;
		justify-content: space-between;
	}
	.panel-heading h3 {
		margin: 0;
		font-size: 18px;
	}
	.panel-heading > small {
		color: #616875;
		font-family: var(--font-mono);
		font-size: 8px;
		text-transform: uppercase;
	}
	.chart {
		position: relative;
		display: grid;
		height: 155px;
		margin-top: 25px;
		place-items: center;
		color: #666d78;
		font-size: 9px;
		overflow: hidden;
	}
	.chart svg {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.chart polyline {
		fill: none;
		stroke: var(--lime);
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.2;
		vector-effect: non-scaling-stroke;
		filter: drop-shadow(0 0 5px rgba(216, 255, 92, 0.35));
	}
	.grid-lines {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.grid-lines i {
		width: 100%;
		border-top: 1px dashed #232831;
	}
	.traffic-facts {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: 16px;
		border-top: 1px solid var(--line);
	}
	.traffic-facts div {
		padding-top: 13px;
	}
	.traffic-facts span {
		color: #626875;
		font-family: var(--font-mono);
		font-size: 7px;
	}
	.traffic-facts strong {
		display: block;
		margin-top: 5px;
		font-size: 13px;
	}
	.pages-panel ol {
		margin: 19px 0 0;
		padding: 0;
		list-style: none;
	}
	.pages-panel li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 11px 0;
		border-top: 1px solid var(--line);
		font-size: 9px;
	}
	.pages-panel li > span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.pages-panel li i {
		margin-right: 10px;
		color: #555c67;
		font-family: var(--font-mono);
		font-size: 7px;
		font-style: normal;
	}
	.pages-panel li strong {
		color: var(--lime);
	}
	.no-pages {
		display: grid;
		min-height: 220px;
		place-items: center;
		color: #6e7580;
		font-size: 9px;
		text-align: center;
	}
	.section-label {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 24px 0 4px;
		color: #676e79;
		font-family: var(--font-mono);
		font-size: 7px;
		letter-spacing: 0.13em;
	}
	.section-label i {
		flex: 1;
		border-top: 1px solid var(--line);
	}
	footer {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		margin-top: 14px;
		color: #686f7b;
		font-size: 8px;
	}
	footer span {
		color: #909784;
	}
	.metrics-error {
		margin-top: 8px;
		padding: 12px 15px;
		border: 1px solid rgba(255, 96, 96, 0.35);
		border-radius: 9px;
		color: #ffb2b2;
		font-size: 9px;
	}
	.metrics-loading {
		display: flex;
		min-height: 300px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: #747b86;
		font-size: 9px;
	}
	.metrics-loading i {
		width: 18px;
		height: 18px;
		border: 2px solid #2a3039;
		border-top-color: var(--lime);
		border-radius: 50%;
		animation: spin 800ms linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (max-width: 900px) {
		.metric-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.system-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 620px) {
		header {
			align-items: flex-start;
			flex-direction: column;
			padding: 20px;
		}
		.controls {
			width: 100%;
			overflow-x: auto;
		}
		.controls button {
			flex: 1;
			white-space: nowrap;
		}
		.metric-grid {
			grid-template-columns: 1fr 1fr;
		}
		.metric-grid article {
			min-height: 108px;
			padding: 14px;
		}
		.metric-grid strong {
			font-size: 20px;
		}
		.panel {
			padding: 17px;
		}
		footer {
			flex-direction: column;
		}
	}
</style>
