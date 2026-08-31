import { demoJobs } from './demo';
import { token } from './auth';
import type { ApplicationPack, Job, JobStatus } from './types';

const apiUrl = (import.meta.env.VITE_CAREER_API_URL || '').replace(/\/$/, '');

export function isDemoMode(): boolean {
	return !apiUrl;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const idToken = token();
	const response = await fetch(`${apiUrl}${path}`, {
		...options,
		headers: {
			'content-type': 'application/json',
			...(idToken ? { authorization: `Bearer ${idToken}` } : {}),
			...(options.headers || {})
		}
	});
	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: response.statusText }));
		throw new Error(error.detail || 'Request failed');
	}
	return response.json();
}

export async function listJobs(): Promise<Job[]> {
	if (isDemoMode())
		return demoJobs
			.map((job) => structuredClone(job))
			.sort((left, right) => right.score.overall - left.score.overall);
	return (await request<{ items: Job[] }>('/jobs')).items;
}

export async function updateJob(job: Job, status: JobStatus, reason?: string): Promise<Job> {
	if (isDemoMode())
		return {
			...job,
			status,
			dismissal_reason: reason || null,
			application_tracking:
				status === 'applied'
					? { ...job.application_tracking, applied_at: new Date().toISOString() }
					: job.application_tracking
		};
	return request<Job>(`/jobs/${job.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ status, reason })
	});
}

export async function prepareApplication(job: Job): Promise<ApplicationPack> {
	if (isDemoMode()) {
		return {
			job_id: job.id,
			cv_headline: `Data Scientist & AI Engineer | ${job.skills.slice(0, 5).join(', ')}`,
			cv_summary: 'Evidence-grounded profile tailored to this vacancy.',
			cover_letter: `A tailored cover letter for ${job.title} at ${job.company} is ready for review.`,
			recruiter_message: `Interested in the ${job.title} position at ${job.company}.`,
			selected_evidence_ids: job.matched_evidence_ids,
			interview_topics: job.requirements,
			gaps_to_address: job.gaps,
			download_urls: {}
		};
	}
	return request<ApplicationPack>(`/jobs/${job.id}/prepare`, { method: 'POST' });
}

export async function getApplicationPack(job: Job): Promise<ApplicationPack> {
	if (isDemoMode()) return prepareApplication(job);
	return request<ApplicationPack>(`/jobs/${job.id}/application-pack`);
}
