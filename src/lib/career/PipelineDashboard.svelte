<script lang="ts">
 import { onMount } from 'svelte';
 import { getOperations, getOperationRun, getTasks, getCoverage, addCoverage, count, displayTime, pretty } from './operations';
 import type { Operations, TaskPage, Coverage, Run } from './operations';
 let data: Operations | null = null;
 let loading = false;
 let error = '';
 let taskError = '';
 let coverageError = '';
 let tasks: TaskPage | null = null;
 let taskLoading = false;
 let kind = 'analysis';
 let status = '';
 let query = '';
 let coverage: Coverage | null = null;
 let runId = '';
 let run: Run | undefined;
 let runError = '';
 let runRequest = 0;
 let title = '', company = '', location = '', reference = '', observed = '';
 let submitting = false, submitted = false;
 let taskRequest = 0;
 let clock = Date.now();
 let dimensions: Array<{ label: string; values: Record<string, Record<string, number>> }> = [];
 $: dimensions = [{ label: 'Employer', values: run?.employer_metrics || {} }, { label: 'Role family', values: run?.role_family_metrics || {} }];
 $: stale = data ? clock - new Date(data.generated_at).getTime() > 120000 : false;
 $: activeAlarms = data?.alarms.items?.filter((item) => item.state !== 'OK') || [];
 const stages = [
  ['collected_listings', 'Source listings collected'], ['canonical_unique', 'Unique canonical vacancies'],
  ['hard_filter_passed', 'Hard gates passed'], ['fast_analyzed', 'Cheap analysis'],
  ['salary_confirmed_pass', 'Salary confirmed'], ['salary_unverified_but_plausible', 'Salary plausible'],
  ['salary_confirmed_fail', 'Salary failed'], ['deep_analysis_candidate_universe', 'Deep-analysis candidates'],
  ['deep_analysis_cache_hits', 'Exact cached analyses reused'], ['deep_analysis_cache_misses', 'Needs fresh analysis'],
  ['deep_analysis_cache_misses_never_analyzed', 'Never deeply analysed cache misses'],
  ['deep_analysis_cache_misses_changed', 'Changed analysis identity'],
  ['deep_analysis_dispatched', 'Dispatched for analysis'], ['deep_analysis_deferred', 'Deferred to backlog'],
  ['deep_analysis_succeeded', 'Fresh analysis succeeded'], ['deep_analysis_failed', 'Recorded analysis failures / deferrals'],
  ['analysis_tasks_timed_out', 'Tasks timed out'], ['qualified_shortlist', 'Qualified recommendations'],
  ['new_recommendations', 'First-time recommendations'], ['digest_included', 'Included in digest']
 ];
 onMount(() => {
  void refresh(); void loadCoverage();
  const timer = window.setInterval(() => {
   clock = Date.now();
   if (document.visibilityState === 'visible') void refresh();
  }, 60000);
  const visible = () => { clock = Date.now(); if (document.visibilityState === 'visible') void refresh(); };
  document.addEventListener('visibilitychange', visible);
  return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', visible); taskRequest++; runRequest++; };
 });
 async function refresh() {
  if (loading) return;
  loading = true; error = '';
  try {
   data = await getOperations(); clock = Date.now();
   if (!data.runs.items?.some((item) => item.run_id === runId)) runId = data.runs.items?.[0]?.run_id || '';
   await Promise.all([loadTasks(), loadRun()]);
  }
  catch (cause) { error = cause instanceof Error ? cause.message : 'Could not read pipeline telemetry.'; }
  finally { loading = false; }
 }
 async function loadRun() {
  const requestId = ++runRequest;
  run = undefined; runError = '';
  if (!runId) return;
  try {
   const result = await getOperationRun(runId);
   if (requestId !== runRequest) return;
   if (result.status !== 'ok' || !result.item) throw new Error('Run telemetry is unavailable.');
   run = result.item;
  } catch (cause) { if (requestId === runRequest) runError = cause instanceof Error ? cause.message : 'Run unavailable.'; }
 }
 async function loadTasks(offset = 0) {
  const requestId = ++taskRequest;
  const previous = tasks;
  taskLoading = true; taskError = '';
  try {
   const parameters: Record<string, string> = { kind, status, q: query, offset: String(offset), limit: '25' };
   if (offset && previous) parameters.snapshot_id = previous.snapshot_id;
   const page = await getTasks(parameters);
   if (requestId === taskRequest) tasks = page;
  } catch (cause) {
   if (requestId === taskRequest) { tasks = null; taskError = cause instanceof Error ? cause.message : 'Task data unavailable.'; }
  } finally { if (requestId === taskRequest) taskLoading = false; }
 }
 async function loadCoverage() {
  coverageError = '';
  try { coverage = await getCoverage(); }
  catch (cause) { coverageError = cause instanceof Error ? cause.message : 'Coverage data unavailable.'; }
 }
 async function submitCoverage() {
  if (submitting) return;
  submitting = true; submitted = false; coverageError = '';
  try {
   const value: Record<string, string> = { title, company, location };
   if (reference) value.reference_url = reference;
   if (observed) value.observed_at = new Date(observed).toISOString();
   await addCoverage(value); title = ''; company = ''; location = ''; reference = ''; observed = '';
   submitted = true; await loadCoverage();
  } catch (cause) { coverageError = cause instanceof Error ? cause.message : 'Could not save sample.'; }
  finally { submitting = false; }
 }
 function metric(key: string) { return run?.stage_counts?.[key]; }
 function money(value: unknown) { return typeof value === 'number' ? `$${(value / 1000000).toFixed(3)}` : 'Unknown'; }
</script>

<section class="operations" aria-label="Private pipeline operations">
 <header class="heading"><div><p class="eyebrow">PRIVATE / PIPELINE OPERATIONS</p><h2>From discovery to your inbox.</h2>
 <p>Live work queues and saved run outcomes. All times below are London time.</p></div>
 <button on:click={refresh} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh pipeline'}</button></header>
 {#if error}<p class="error" role="alert">{error} {data ? 'Previous snapshot retained; it is not current.' : ''}</p>{/if}
 {#if data}
 <p class:warning={stale} class="stamp">Snapshot {displayTime(data.generated_at)} · {stale ? 'STALE — refresh required' : 'refreshes every minute while visible'} · {data.snapshot_id}</p>
 <div class="cards">
  <article><h3>Awaiting full Reed description</h3><strong>{count(data.hydration.active, data.hydration.complete)}</strong>
   <p>Unique listing IDs · queued, dispatched or processing</p><small>Oldest: {count(data.hydration.oldest_active_hours)} hours</small>
   <p class="state">Telemetry: {data.hydration.status}</p></article>
  <article><h3>Description ready → admission</h3><strong>{count(data.hydration.description_ready_waiting_admission, data.hydration.complete)}</strong>
   <p>Full detail stored; cheap-gate outcome still pending</p><small>{count(data.hydration.description_ready_total, data.hydration.complete)} retained completed fetches</small></article>
  <article><h3>Awaiting deep analysis</h3><strong>{count(data.analysis.active_unique_jobs, data.analysis.complete)}</strong>
   <p>Distinct canonical jobs across active tasks</p><small>{count(data.analysis.active, data.analysis.complete)} versioned tasks · oldest {count(data.analysis.oldest_active_hours)} hours</small>
   <p class="state">Telemetry: {data.analysis.status}</p></article>
  <article><h3>Daily fresh-call allowance</h3><strong>{count(data.budget.remaining?.calls)}</strong>
   <p>Calls remaining of {count(data.budget.limits?.calls)} · {data.budget.budget_date || 'Unknown day'}</p>
   <small>Budget-deferred tasks: {count(data.analysis.budget_deferred, data.analysis.complete)}</small></article>
 </div>
 <p class="note">Durable counts cover retained records, read across pages—not an atomic instant. “≥” means a bounded read was incomplete. Oldest age is unknown when no active task exists. Queue messages below are separate and must not be added to these counts.</p>
 <details class="panel"><summary>Durable task states & admission outcomes</summary>
  <h3>Analysis tasks</h3><ul>{#each Object.entries(data.analysis.status_counts || {}) as [state, value]}<li>{pretty(state)}: {count(value, data.analysis.complete)}</li>{/each}</ul>
  <p>Budget-deferred: {count(data.analysis.budget_deferred, data.analysis.complete)} · other timed-out work: {count(data.analysis.other_timed_out, data.analysis.complete)}. Both remain eligible backlog; neither is automatically a final rejection.</p>
  <h3>Reed description tasks</h3><ul>{#each Object.entries(data.hydration.status_counts || {}) as [state, value]}<li>{pretty(state)}: {count(value, data.hydration.complete)}</li>{/each}</ul>
  <h3>Completed detail fetch → admission outcome</h3><ul>{#each Object.entries(data.hydration.ready_outcomes || {}) as [state, value]}<li>{pretty(state)}: {count(value, data.hydration.complete)}</li>{/each}</ul>
 </details>

 <section class="panel"><h3>Transport queues</h3><p>Approximate SQS messages, not unique jobs. In-flight means received but not acknowledged; deliveries can include retries. Age is the latest available five-minute maximum, not original listing age.</p>
  <div class="table-scroll"><table><thead><tr><th>Stage / unit</th><th>Waiting</th><th>In flight</th><th>Delayed</th><th>Oldest (minutes)</th><th>Deliveries / hour</th><th>Telemetry</th></tr></thead><tbody>
   {#each data.queues.items || [] as queue}<tr class:warning={queue.dlq && (queue.waiting || 0) > 0}><td>{queue.label}{queue.dlq ? ' · DLQ' : ''}<small>{queue.unit}</small></td>
    <td>{count(queue.waiting)}</td><td>{count(queue.in_flight)}</td><td>{count(queue.delayed)}</td>
    <td>{count(queue.oldest_message_seconds == null ? null : Math.round(queue.oldest_message_seconds / 60))}<small>{queue.age_observed_at ? displayTime(queue.age_observed_at) : 'No age datapoint'}</small></td>
    <td>{count(queue.deliveries_last_hour)}</td><td>{queue.status}</td></tr>{/each}
  </tbody></table></div>
  {#if data.queues.status !== 'ok'}<p class="warning">Queue telemetry {data.queues.status}. Missing values are unknown, not zero.</p>{/if}
 </section>

 <section class="panel"><h3>Workday employer-board progress</h3><p>{data.ingestion?.scope || 'Recent collection runs'} · telemetry {data.ingestion?.status || 'unavailable'}</p>
  {#each data.ingestion?.items || [] as collection}<details><summary>{displayTime(collection.started_at)} · {collection.status} · {collection.observed_tasks} / {collection.expected_tasks} task records</summary>
   <p>Run {collection.run_id}. These are employer boards, not listings.</p>
   {#if collection.observed_tasks !== collection.expected_tasks}<p class="warning">Observed task count differs from the run's expected count; investigate before treating this run as complete.</p>{/if}
   <p>{Object.entries(collection.status_counts).map(([state, value]) => `${pretty(state)}: ${value}`).join(' · ')}</p>
   <div class="table-scroll"><table><thead><tr><th>Employer</th><th>Status</th><th>Attempts</th><th>Last error</th></tr></thead><tbody>{#each collection.tasks as task}<tr><td>{task.employer}<small>{task.source_key}</small></td><td>{task.status}</td><td>{task.attempts}</td><td>{task.last_error || 'None recorded'}</td></tr>{/each}</tbody></table></div>
  </details>{/each}
 </section>

 <section class="panel"><h3>Schedules & alerts</h3><div class="table-scroll"><table><thead><tr><th>Schedule</th><th>Enabled state / cadence</th><th>Last invocation bucket</th><th>Cadence signal</th></tr></thead><tbody>
  {#each data.schedules.items || [] as schedule}<tr><td>{schedule.label}</td><td>{schedule.state || 'Unknown'}<small>{schedule.expression || 'Unknown cadence'}</small></td>
   <td>{displayTime(schedule.last_invocation_bucket)}</td><td>{schedule.cadence_overdue == null ? 'Unknown' : schedule.cadence_overdue ? 'Overdue — investigate' : 'Recent invocation'}</td></tr>{/each}
 </tbody></table></div><p class="note">Invocations include manual calls and idle probes; they do not prove a successful run. Five-minute timestamps are approximate; overdue allows a grace window. Telemetry: {data.schedules.status}.</p>
 {#if data.alarms.status === 'unavailable'}<p class="warning">Alarm state unavailable.</p>
 {:else if activeAlarms.length}{#each activeAlarms as alarm}<details class="warning"><summary>{alarm.state}: {alarm.name}</summary><p>{alarm.reason}</p></details>{/each}
 {:else}<p>No non-OK alarms in the returned scope.</p>{/if}
 </section>

 <section class="panel"><div class="heading"><div><h3>Discovery run funnel</h3><p>Stored counts for one run, not the live backlog. Missing counters are unknown; stages branch and must not be summed.</p></div>
  <label>Run <select aria-label="Run" bind:value={runId} on:change={loadRun}>{#each data.runs.items || [] as item}<option value={item.run_id}>{displayTime(item.started_at)} · {item.status}</option>{/each}</select></label></div>
  {#if runError}<p class="error" role="alert">{runError}</p>{/if}
  {#if run}<p><b>{run.status}</b> · last checkpoint: {run.last_completed_stage || 'Unknown'} · completed: {displayTime(run.completed_at)} · digest publication: {run.emailed ? 'recorded sent (not inbox confirmation)' : 'not recorded sent'}</p>
  <div class="table-scroll"><table><thead><tr><th>Stage</th><th>Count</th><th>First occurrence in retained history</th></tr></thead><tbody>
   {#each stages as [key, label]}<tr><td>{label}</td><td>{count(metric(key))}</td><td>{count(run.new_stage_counts?.[key])}</td></tr>{/each}
  </tbody></table></div><p class="note">Schema v{run.telemetry_schema_version} · novelty scope: {run.newness_scope}. Historical failed/timed-out counters may include budget deferrals. Reed ready events after finalization do not revise this discovery funnel.</p>
  <details><summary>Rejection reasons and run errors</summary><ul>{#each Object.entries(run.rejection_counts) as [reason, value]}<li>{pretty(reason)}: {count(value)}</li>{/each}</ul>{#each run.errors as message}<p class="warning">{message}</p>{/each}</details>
  <details><summary>Source comparison for this run</summary><p>Post-deduplication attribution uses the winning canonical source, not every source carrying a duplicate.</p><div class="table-scroll"><table><thead><tr><th>Source</th><th>Unique</th><th>Gate pass</th><th>Deep evaluated</th><th>Qualified</th></tr></thead><tbody>
   {#each Object.entries(run.source_metrics) as [source, values]}<tr><td>{source}</td><td>{count(values.canonical_unique)}</td><td>{count(values.hard_filter_passed)}</td><td>{count(values.deep_analysis_evaluated)}</td><td>{count(values.qualified_shortlist)}</td></tr>{/each}
  </tbody></table></div></details>
  <details><summary>Source fetch health & latency for this run</summary><div class="table-scroll"><table><thead><tr><th>Source / employer route</th><th>Status</th><th>Listings</th><th>Duration (ms)</th><th>Last fetch / error</th></tr></thead><tbody>
   {#each run.source_fetches || [] as fetch}<tr><td>{fetch.source_key}</td><td>{fetch.status}</td><td>{count(fetch.listings_fetched)}</td><td>{count(fetch.duration_ms)}</td><td>{displayTime(fetch.completed_at)}<small>{fetch.error || 'No error recorded'}</small></td></tr>{/each}
  </tbody></table></div></details>
  <details><summary>Employer and role-family conversion</summary>{#each dimensions as dimension}<h4>{dimension.label}</h4><div class="table-scroll"><table><thead><tr><th>Name</th><th>Unique</th><th>Gate pass</th><th>Qualified</th></tr></thead><tbody>
   {#each Object.entries(dimension.values) as [name, values]}<tr><td>{name}</td><td>{count(values.canonical_unique)}</td><td>{count(values.hard_filter_passed)}</td><td>{count(values.qualified_shortlist)}</td></tr>{/each}
  </tbody></table></div>{/each}</details>
  <details><summary>Run identity & configuration</summary><p>Run ID: {run.run_id}</p><pre>{JSON.stringify(run.configuration, null, 2)}</pre></details>
  {:else}<p>No discovery records available. Telemetry: {data.runs.status}.</p>{/if}
 </section>

 <section class="panel"><h3>Daily analysis budget</h3><p>{data.budget.budget_date || 'Unknown'} · {data.budget.timezone || 'Unknown timezone'}. Committed includes reservations; actual records reconciled responses. Cost uses configured token prices—not the total AWS bill.</p>
 <div class="table-scroll"><table><thead><tr><th>Resource</th><th>Committed</th><th>Actual recorded</th><th>Limit</th><th>Remaining</th></tr></thead><tbody>
  {#each ['calls', 'input_tokens', 'output_tokens', 'cost_microusd'] as key}<tr><td>{pretty(key)}</td>
   <td>{key === 'cost_microusd' ? money(data.budget.usage?.[key + '_committed']) : count(typeof data.budget.usage?.[key + '_committed'] === 'number' ? Number(data.budget.usage?.[key + '_committed']) : data.budget.ledger_present === false ? 0 : null)}</td>
   <td>{key === 'cost_microusd' ? money(data.budget.usage?.[key + '_actual']) : count(typeof data.budget.usage?.[key + '_actual'] === 'number' ? Number(data.budget.usage?.[key + '_actual']) : data.budget.ledger_present === false ? 0 : null)}</td>
   <td>{key === 'cost_microusd' ? money(data.budget.limits?.[key]) : count(data.budget.limits?.[key])}</td><td>{key === 'cost_microusd' ? money(data.budget.remaining?.[key]) : count(data.budget.remaining?.[key])}</td></tr>{/each}
 </tbody></table></div><p class="note">{data.budget.ledger_present === false ? 'No ledger yet for this day: no committed usage recorded.' : ''} Telemetry: {data.budget.status}.</p>
 </section>
 {/if}

 <section class="panel"><h3>Listing / task explorer</h3><p>Retained Reed hydration and versioned analysis records. This is not an archive of every rejected advert.</p>
 <form class="filters" on:submit|preventDefault={() => loadTasks()}>
  <label>Queue <select aria-label="Queue" bind:value={kind} on:change={() => { status = ''; void loadTasks(); }}><option value="analysis">Deep analysis</option><option value="hydration">Reed descriptions</option></select></label>
  <label>Status <select aria-label="Status" bind:value={status} on:change={() => loadTasks()}><option value="">All states</option>{#each (kind === 'analysis' ? ['queued', 'timed_out', 'dispatched', 'processing', 'completed', 'expired', 'cancelled'] : ['queued', 'dispatched', 'processing', 'completed', 'failed']) as state}<option value={state}>{pretty(state)}</option>{/each}</select></label>
  <label>Title, employer or ID <input bind:value={query} maxlength="200" placeholder="Find a listing" /></label><button disabled={taskLoading}>Search tasks</button>
 </form>
 {#if taskError}<p class="error" role="alert">{taskError}</p>{/if}
 {#if tasks}<p>{count(tasks.total, tasks.complete)} matching retained tasks · {displayTime(tasks.observed_at)} · {tasks.status}</p>
  {#each tasks.items as task}<details class="task"><summary><span>{task.title} · {task.company}</span><span class="badge">{pretty(task.status)}{task.ready_status ? ` / ${pretty(task.ready_status)}` : ''}</span></summary>
   <p>{task.location} · {task.source} · first queued/seen {displayTime(task.first_seen_at)} · {task.attempts} attempts</p>
   {#if task.last_error}<p class="warning">{task.last_error}</p>{/if}
   {#if task.gate_reasons?.length}<p>Gate reasons: {task.gate_reasons.join('; ')}</p>{/if}
   <dl><dt>Task/listing ID</dt><dd>{task.id}</dd><dt>Canonical job</dt><dd>{task.job_id || 'Not recorded at this stage'}</dd><dt>Analysis task</dt><dd>{task.analysis_task_id || 'Not recorded'}</dd><dt>Selected run</dt><dd>{task.selected_run_id || 'Not recorded'}</dd><dt>Next retry eligibility</dt><dd>{displayTime(task.next_attempt_at)}</dd><dt>Result source</dt><dd>{task.result_source || 'Not recorded'}</dd></dl>
  </details>{/each}
  <div class="buttons"><button on:click={() => loadTasks()} disabled={taskLoading}>First page</button>{#if tasks.next_offset != null}<button on:click={() => loadTasks(tasks?.next_offset || 0)} disabled={taskLoading}>Next page</button>{/if}</div>
 {/if}
 </section>

 <section class="panel"><h3>Coverage benchmark</h3><p>Add a vacancy you found manually. The existing 12-hour probe checks authorized sources; it never opens LinkedIn. Saving activates that probe when it next runs and can queue Reed description retrieval.</p>
 <p class="note">Sampled discovery recall, not qualification accuracy. Current probe excludes direct Workday fetching; asynchronous Reed and probe timing can affect results. Matches are fuzzy title/company/location matches.</p>
 <form class="coverage-form" on:submit|preventDefault={submitCoverage}>
  <label>Job title<input bind:value={title} required maxlength="300" /></label><label>Employer<input bind:value={company} required maxlength="200" /></label>
  <label>Location<input bind:value={location} maxlength="300" /></label><label>LinkedIn reference (optional)<input bind:value={reference} type="url" placeholder="https://www.linkedin.com/jobs/…" /></label>
  <label>Observed at (optional, your browser timezone)<input bind:value={observed} type="datetime-local" /></label><button disabled={submitting}>{submitting ? 'Saving…' : 'Save benchmark sample'}</button>
 </form>
 {#if coverageError}<p class="error" role="alert">{coverageError}</p>{/if}{#if submitted}<p role="status">Sample saved.</p>{/if}
 {#if coverage}<p><b>24-hour sampled recall: {coverage.metrics.resolved_samples ? `${coverage.metrics.recall_within_24h_percent}%` : 'Not yet measurable'}</b> · {coverage.metrics.resolved_samples} resolved · {coverage.metrics.pending} pending. Latest {coverage.count} samples (maximum 200), not lifetime totals.</p>
 <div class="table-scroll"><table><thead><tr><th>Vacancy</th><th>Observed / deadline</th><th>Result</th><th>Source / first match</th></tr></thead><tbody>
  {#each coverage.items as sample}<tr><td>{sample.title}<small>{sample.company} · {sample.location}</small></td><td>{displayTime(sample.observed_at)}<small>{displayTime(sample.deadline_at)}</small></td><td>{pretty(sample.status)}</td><td>{sample.matched_source || 'Not matched'}<small>{sample.first_matched_at ? displayTime(sample.first_matched_at) : '—'}</small></td></tr>{/each}
 </tbody></table></div>{/if}<button on:click={loadCoverage}>Refresh benchmark</button>
 </section>
</section>

<style>
 .operations { color: #dce5ec; padding: 1.5rem 0 4rem; font-size: 14px; }
 .heading { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
 .eyebrow { color: #7ec9bc; font-size: 11px; letter-spacing: .15em; }
 h2 { font-size: clamp(24px, 4vw, 34px); margin: .4rem 0; } h3 { font-size: 17px; margin: 0 0 .8rem; }
 p { line-height: 1.6; color: #aebfcb; margin: .65rem 0; } .stamp, .note { font-size: 12px; overflow-wrap: anywhere; }
 .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 20px 0 12px; }
 article, .panel { background: #14202a; border: 1px solid #2d414e; border-radius: 12px; padding: 20px; }
 article h3 { font-size: 13px; color: #aec1c9; } article strong { font-size: 32px; color: #b2f0dd; }
 small { display: block; color: #92a8b7; font-size: 11px; margin-top: 5px; } .state { font-size: 11px; }
 .panel { margin-top: 20px; } .table-scroll { overflow-x: auto; } table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
 th, td { border-bottom: 1px solid #2b3c47; padding: 12px 10px; vertical-align: top; } th { color: #9fb9c7; font-size: 11px; }
 button { color: #d5f8ed; background: #244b46; border: 1px solid #437c70; border-radius: 7px; padding: 9px 14px; cursor: pointer; font-size: 12px; }
 button:disabled { opacity: .5; cursor: wait; } button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid #83e4cd; outline-offset: 3px; }
 label { display: flex; flex-direction: column; gap: 6px; color: #adc2ce; font-size: 12px; min-width: 0; }
 input, select { background: #0e1921; border: 1px solid #425865; border-radius: 6px; padding: 10px; color: #e6eef4; max-width: 100%; min-width: 0; }
 .filters, .coverage-form { display: grid; grid-template-columns: 1fr 1fr 2fr auto; gap: 12px; align-items: end; margin: 15px 0; }
 .coverage-form { grid-template-columns: 1fr 1fr; } .warning { color: #efc186; } .error { background: #492e2e; color: #ffcccc; padding: 12px; border-radius: 6px; }
 details { margin-top: 12px; border-top: 1px solid #304551; padding: 12px 0; } summary { cursor: pointer; line-height: 1.5; }
 .task summary { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; } .badge { color: #9ae3d0; font-size: 12px; }
 dl { display: grid; grid-template-columns: 160px 1fr; gap: 8px; } dd { margin: 0; overflow-wrap: anywhere; } dt { color: #9eb4c0; }
 pre { white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; } .buttons { display: flex; gap: 10px; margin-top: 16px; }
 @media (max-width: 950px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filters { grid-template-columns: 1fr 1fr; } }
 @media (max-width: 560px) { .cards, .coverage-form, .filters { grid-template-columns: 1fr; } article, .panel { padding: 14px; } dl { grid-template-columns: 1fr; } h2 { font-size: 24px; } }
</style>
