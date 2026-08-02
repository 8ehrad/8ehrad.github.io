export type JobStatus =
	| 'recommended'
	| 'shortlisted'
	| 'preparing'
	| 'ready_to_apply'
	| 'applied'
	| 'recruiter_response'
	| 'interview'
	| 'offer'
	| 'rejected'
	| 'withdrawn'
	| 'dismissed';

export type Salary = {
	minimum_gbp: number | null;
	maximum_gbp: number | null;
	confidence: 'advertised' | 'high' | 'medium' | 'low' | 'unknown';
	source_url?: string | null;
	source_label?: string | null;
	inferred: boolean;
};

export type Job = {
	id: string;
	title: string;
	company: string;
	location: string;
	description: string;
	apply_url: string;
	source_url: string;
	source: string;
	posted_at?: string | null;
	closes_at?: string | null;
	workplace: string;
	salary: Salary;
	skills: string[];
	requirements: string[];
	matched_evidence_ids: string[];
	match_reasons: string[];
	gaps: string[];
	red_flags: string[];
	company_context: Record<string, unknown>;
	score: {
		attainability: number;
		career_gain: number;
		remuneration: number;
		location: number;
		overall: number;
		hard_gate_passed: boolean;
	};
	status: JobStatus;
	recommendation_date?: string | null;
	dismissal_reason?: string | null;
	application_tracking: Record<string, string>;
};

export type ApplicationPack = {
	job_id: string;
	cv_headline: string;
	cv_summary: string;
	cover_letter: string;
	recruiter_message: string;
	selected_evidence_ids: string[];
	interview_topics: string[];
	gaps_to_address: string[];
	download_urls: Record<string, string>;
};
