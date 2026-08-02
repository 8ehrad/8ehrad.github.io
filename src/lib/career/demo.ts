import type { Job } from './types';

const defaults = {
	source: 'greenhouse',
	posted_at: '2026-08-01',
	closes_at: null,
	requirements: ['Production Python experience', 'Experience deploying ML or AI systems', 'Clear stakeholder communication'],
	red_flags: [],
	status: 'recommended' as const,
	recommendation_date: '2026-08-02',
	dismissal_reason: null,
	application_tracking: {}
};

export const demoJobs: Job[] = [
	{
		...defaults,
		id: 'northstar-senior-ds',
		title: 'Senior Data Scientist',
		company: 'Northstar Fintech',
		location: 'Manchester, UK',
		workplace: 'hybrid',
		description:
			'Own end-to-end production machine-learning products across customer decisioning and experimentation. Work with product and engineering partners to define measurable outcomes, build reliable features, deploy models and improve them through monitoring.',
		apply_url: 'https://careers.example.com/northstar/senior-data-scientist',
		source_url: 'https://careers.example.com/northstar/senior-data-scientist',
		salary: { minimum_gbp: 65000, maximum_gbp: 78000, confidence: 'advertised', inferred: false, source_label: 'Employer advert' },
		skills: ['Python', 'SQL', 'Machine Learning', 'AWS', 'Statistics'],
		matched_evidence_ids: ['BET365-FEATURES', 'BET365-GCP', 'BET365-OWNERSHIP'],
		match_reasons: ['Your production feature-engineering ownership maps directly to the role.', 'Manchester hybrid and a credible senior-level compensation step.'],
		gaps: [],
		company_context: { industry: 'Financial technology', size: 'Scale-up', role_summary: 'Senior individual-contributor role with end-to-end ownership.' },
		score: { attainability: 91, career_gain: 86, remuneration: 83, location: 100, overall: 89, hard_gate_passed: true }
	},
	{
		...defaults,
		id: 'civic-applied-ai',
		title: 'Applied AI Engineer',
		company: 'Civic Intelligence',
		location: 'Remote, United Kingdom',
		workplace: 'remote',
		description:
			'Build grounded LLM and agentic workflows for public-service teams. You will own retrieval, structured evaluation, guardrails, deployment and monitoring on AWS.',
		apply_url: 'https://jobs.example.com/civic/applied-ai',
		source_url: 'https://jobs.example.com/civic/applied-ai',
		source: 'ashby',
		salary: { minimum_gbp: 70000, maximum_gbp: 85000, confidence: 'advertised', inferred: false, source_label: 'Ashby compensation' },
		skills: ['Python', 'AWS', 'Bedrock', 'LLM Engineering', 'RAG', 'Agentic AI', 'Terraform'],
		matched_evidence_ids: ['INFORMED-MULTIMODAL', 'INFORMED-RAG', 'ALEX-END-TO-END'],
		match_reasons: ['Exceptionally close match to your professional document-AI and RAG evidence.', 'The role advances your positioning from data science into applied AI engineering.'],
		gaps: ['Confirm the expected depth of frontend product ownership.'],
		company_context: { industry: 'GovTech', size: '250–500 employees', role_summary: 'Applied AI delivery across high-impact public workflows.' },
		score: { attainability: 88, career_gain: 95, remuneration: 91, location: 90, overall: 91, hard_gate_passed: true }
	},
	{
		...defaults,
		id: 'health-ml-engineer',
		title: 'Machine Learning Engineer',
		company: 'Health Data Labs',
		location: 'Manchester, UK',
		workplace: 'hybrid',
		description:
			'Deliver BigQuery feature pipelines and deployed ML services for clinical operations. The position combines data science, feature engineering and pragmatic production delivery.',
		apply_url: 'https://jobs.example.com/health/ml-engineer',
		source_url: 'https://jobs.example.com/health/ml-engineer',
		source: 'lever',
		salary: { minimum_gbp: 60000, maximum_gbp: 72000, confidence: 'high', inferred: true, source_label: 'Company and title salary evidence' },
		skills: ['Python', 'GCP', 'BigQuery', 'Feature Engineering', 'Docker'],
		matched_evidence_ids: ['BET365-GCP', 'BET365-FEATURES'],
		match_reasons: ['Direct overlap with your BigQuery and Vertex AI feature-platform work.', 'Manchester hybrid with a meaningful compensation increase.'],
		gaps: ['The software engineering interview may be more code-intensive than a typical data-science process.'],
		company_context: { industry: 'Health technology', size: '500–1,000 employees', role_summary: 'ML product engineering with strong data-platform overlap.' },
		score: { attainability: 80, career_gain: 82, remuneration: 72, location: 100, overall: 81, hard_gate_passed: true }
	},
	{
		...defaults,
		id: 'signal-applied-scientist',
		title: 'Applied Scientist',
		company: 'Signal Works',
		location: 'London, UK',
		workplace: 'hybrid',
		description:
			'Lead applied NLP and evaluation projects from experimentation through deployment. Partner with researchers, product managers and platform engineers.',
		apply_url: 'https://jobs.example.com/signal/applied-scientist',
		source_url: 'https://jobs.example.com/signal/applied-scientist',
		salary: { minimum_gbp: 76000, maximum_gbp: 88000, confidence: 'high', inferred: true, source_label: 'Two recent company-specific salary sources' },
		skills: ['Python', 'NLP', 'Statistics', 'Model Evaluation', 'Machine Learning'],
		matched_evidence_ids: ['INFORMED-NLP', 'PRICER-QLORA', 'EDUCATION-MSC'],
		match_reasons: ['Strong match to your NLP, statistical and evaluation background.', 'Compensation clears the relocation threshold and offers deeper applied-science scope.'],
		gaps: ['Advert prefers five years of experience; emphasize technical ownership and quantified delivery.'],
		company_context: { industry: 'Enterprise AI', size: '1,000–5,000 employees', role_summary: 'Applied research translated into customer-facing systems.' },
		score: { attainability: 69, career_gain: 91, remuneration: 100, location: 60, overall: 81, hard_gate_passed: true }
	},
	{
		...defaults,
		id: 'ledger-genai',
		title: 'Generative AI Engineer',
		company: 'Ledger AI',
		location: 'Remote within the UK',
		workplace: 'remote',
		description:
			'Design retrieval-augmented and multi-agent systems for regulated financial workflows, with a focus on evaluation, tool permissions, observability and cost.',
		apply_url: 'https://jobs.example.com/ledger/genai',
		source_url: 'https://jobs.example.com/ledger/genai',
		source: 'adzuna',
		salary: { minimum_gbp: 68000, maximum_gbp: 82000, confidence: 'advertised', inferred: false, source_label: 'Employer advert' },
		skills: ['Python', 'RAG', 'MCP', 'Agentic AI', 'AWS', 'Docker'],
		matched_evidence_ids: ['ALEX-END-TO-END', 'TRADING-MCP', 'INFORMED-RAG'],
		match_reasons: ['Your Alex and Trading Floor projects provide unusually relevant evidence.', 'Remote arrangement and AI-engineering scope both fit your preferences.'],
		gaps: ['Clarify whether regulated-industry experience is essential or desirable.'],
		company_context: { industry: 'Financial AI', size: '100–250 employees', role_summary: 'Production agent systems for regulated teams.' },
		score: { attainability: 83, career_gain: 94, remuneration: 87, location: 90, overall: 88, hard_gate_passed: true }
	}
];
