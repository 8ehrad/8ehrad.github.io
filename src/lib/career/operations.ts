import { isDemoMode, request } from './api';

export type Section = { status: 'ok' | 'partial' | 'unavailable'; observed_at?: string; reason?: string };
export type TaskSummary = Section & {
 complete?: boolean; retained_total?: number; active?: number; active_unique_jobs?: number;
 status_counts?: Record<string, number>; oldest_active_hours?: number | null;
 budget_deferred?: number; other_timed_out?: number; waiting_dispatch?: number;
 description_ready_waiting_admission?: number; description_ready_total?: number;
 ready_outcomes?: Record<string, number>;
};
export type Run = {
 run_id: string; started_at: string; completed_at: string | null; status: string;
 last_completed_stage: string | null; stage_counts: Record<string, number>;
 new_stage_counts: Record<string, number>; rejection_counts: Record<string, number>;
 source_metrics: Record<string, Record<string, number>>; errors: string[]; emailed: boolean;
 telemetry_schema_version: number; newness_scope: string; configuration: Record<string, unknown>;
 source_fetches?: { source_key: string; status: string; listings_fetched: number; duration_ms?: number; error?: string; completed_at?: string }[];
 employer_metrics?: Record<string, Record<string, number>>;
 role_family_metrics?: Record<string, Record<string, number>>;
};
export type Queue = Section & {
 id: string; label: string; unit: string; dlq: boolean; waiting: number | null;
 in_flight: number | null; delayed: number | null; oldest_message_seconds?: number | null;
 deliveries_last_hour?: number | null; age_observed_at?: string;
};
export type Schedule = Section & {
 name: string; label: string; state: string | null; expression?: string; timezone?: string;
 last_invocation_bucket?: string | null; cadence_overdue?: boolean | null;
};
export type Operations = {
 schema_version: number; generated_at: string; snapshot_id: string;
 analysis: TaskSummary; hydration: TaskSummary;
 freshness?: { status: string; mode?: string; complete?: boolean; observed?: number;
  state_counts?: Record<string, number>; by_source?: Record<string, Record<string, number>>;
  pending?: number; oldest_overdue_seconds?: number; observed_at?: string;
  items?: { key: string; source: string; title: string; state: string; requested: boolean;
   latest?: { outcome: string; at: number; reason: string }; last_positive_at?: number;
   next_check_at?: number }[] };
 queues: Section & { items?: Queue[] };
 schedules: Section & { items?: Schedule[] };
 alarms: Section & { items?: { name: string; state: string; reason?: string }[] };
 runs: Section & { items?: Pick<Run, 'run_id' | 'started_at' | 'completed_at' | 'status' | 'last_completed_stage' | 'emailed'>[]; scope?: string };
 ingestion: Section & { scope?: string; items?: { run_id: string; started_at: string; status: string;
 expected_tasks: number; observed_tasks: number; status_counts: Record<string, number>;
 tasks: { source_key: string; employer: string; status: string; attempts: number; last_error?: string }[] }[] };
 budget: Section & { budget_date?: string; timezone?: string; limits?: Record<string, number>;
 usage?: Record<string, number | string | null>; remaining?: Record<string, number>; ledger_present?: boolean };
};
export type Task = {
 id: string; kind: string; title: string; company: string; location: string; source: string;
 status: string; attempts: number; first_seen_at: string; last_error?: string;
 ready_status?: string; gate_reasons?: string[]; job_id?: string; analysis_task_id?: string;
 selected_run_id?: string; next_attempt_at?: string; result_source?: string;
};
export type TaskPage = Section & { items: Task[]; total: number | null; complete?: boolean;
 snapshot_id: string; next_offset?: number | null };
export type CoverageSample = { sample_id: string; title: string; company: string; location: string;
 status: string; observed_at: string; deadline_at: string; first_matched_at?: string; matched_source?: string };
export type Coverage = { items: CoverageSample[]; count: number; metrics: Record<string, number> };

function requireLive() {
 if (isDemoMode()) throw new Error('Pipeline telemetry is unavailable in demo mode. No production numbers are simulated.');
}
export async function getOperations() { requireLive(); return request<Operations>('/operations'); }
export async function getOperationRun(runId: string) {
 requireLive(); return request<Section & { item: Run | null }>(`/operations/run?${new URLSearchParams({ run_id: runId })}`);
}
export async function getTasks(parameters: Record<string, string>) {
 requireLive(); return request<TaskPage>(`/operations/tasks?${new URLSearchParams(parameters)}`);
}
export async function getCoverage() { requireLive(); return request<Coverage>('/coverage-benchmark?limit=200'); }
export async function addCoverage(value: Record<string, string>) {
 requireLive(); return request<CoverageSample>('/coverage-benchmark/samples', { method: 'POST', body: JSON.stringify(value) });
}
export function count(value: number | null | undefined, complete = true): string {
 return value == null ? 'Unknown' : `${complete ? '' : '≥ '}${value.toLocaleString('en-GB')}`;
}
export function displayTime(value?: string | null): string {
 return value ? new Date(value).toLocaleString('en-GB', { timeZone: 'Europe/London' }) : 'Unknown';
}
export function pretty(value: string): string { return value.replaceAll('_', ' '); }
