export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	location: string;
	summary: string;
	highlights: string[];
	stack: string[];
	current?: boolean;
};

export type ProjectItem = {
	name: string;
	eyebrow: string;
	description: string;
	proof: string;
	stack: string[];
	href: string;
	featured?: boolean;
};

export const profile = {
	name: 'Behrad Zabihi',
	role: 'Data Scientist & AI Engineer',
	location: 'Manchester, UK',
	email: 'behradz.work@gmail.com',
	github: 'https://github.com/8ehrad',
	linkedin: 'https://www.linkedin.com/in/behrad-zabihi/',
	summary:
		'I build intelligent systems that survive contact with the real world — from production ML and multimodal AI pipelines to fine-tuned LLMs and multi-agent products.',
	positioning:
		'I work where data science meets AI engineering: defining the problem, shaping the data, evaluating the model, and delivering the reliable system around it.',
	availability: 'Eligible to work in the UK without sponsorship'
};

export const proofPoints = [
	{ value: '3.5+ yrs', label: 'delivering professional data science and AI systems' },
	{ value: 'Gold medal', label: 'National Olympiad in Informatics — one of only eight winners' },
	{ value: 'Top 2.5%', label: 'MSc Data Science & Statistics at Lancaster University' },
	{ value: 'AWS + GCP', label: 'production experience across both cloud platforms' }
];

export const experience: ExperienceItem[] = [
	{
		role: 'Data Scientist',
		company: 'Bet365',
		period: 'Feb 2026 — Present',
		location: 'Manchester, UK',
		current: true,
		summary:
			'Building production player-profiling data products and low-latency ML feature infrastructure across on-premise and GCP environments.',
		highlights: [
			'Engineered 700+ ML-ready features across gaming preferences and behavioural patterns for more than 1M UK players using SQL Server and Python.',
			'Productionised an end-to-end GCP pipeline with daily BigQuery incremental recompute and Vertex AI Feature Store serving at 10ms latency.'
		],
		stack: ['Python', 'SQL Server', 'GCP', 'BigQuery', 'Vertex AI']
	},
	{
		role: 'Data Scientist',
		company: 'Informed Solutions',
		period: 'Nov 2023 — Nov 2025',
		location: 'Manchester, UK',
		summary:
			'Delivered applied AI, data platforms and decision-support products for complex public-sector workflows.',
		highlights: [
			'Built a multimodal AWS validation pipeline using Llama, LLaVA, Bedrock and Textract, reducing a two-week review process to real time at 0.91 F1.',
			'Developed a prompt-engineered RAG workflow to match new applications against relevant historical cases.',
			'Linked EPC and postcode data for 65,000 households through an Airbyte and dbt pipeline, powering household-level insights.'
		],
		stack: ['AWS', 'Bedrock', 'Llama', 'LLaVA', 'Textract', 'RAG', 'Airbyte', 'dbt', 'Power BI']
	},
	{
		role: 'Data Science Placement',
		company: 'Informed Solutions',
		period: 'Jun 2023 — Sep 2023',
		location: 'Manchester, UK',
		summary: 'Applied modern NLP and LLM techniques to high-volume planning documents.',
		highlights: [
			'Built keyword extraction, topic modelling and summarisation pipelines for structured and unstructured content.',
			'Used LangChain to summarise planning cases, cutting review time by 60% and reaching BERTScore F1 of 0.84.'
		],
		stack: ['Python', 'NLP', 'BERTopic', 'LangChain', 'LLMs']
	},
	{
		role: 'Data Scientist',
		company: 'Mizan Gostaran Sharif',
		period: 'Jun 2022 — Aug 2022',
		location: 'Tehran, Iran',
		summary: 'Scaled NLP systems for recruitment search and semantic candidate matching.',
		highlights: [
			'Scaled a resume parsing system from 26K to more than 500K CVs with a custom entity-extraction pipeline.',
			'Improved job recommendation using UMAP and HDBSCAN clustering for semantic similarity analysis.'
		],
		stack: ['Python', 'NLP', 'UMAP', 'HDBSCAN']
	},
	{
		role: 'ML Research Assistant',
		company: 'Sharif University of Technology',
		period: 'Feb 2021 — Jul 2021',
		location: 'Tehran, Iran',
		summary: 'Researched global Covid-19 propagation through statistical and graph modelling.',
		highlights: [
			'Modelled transmission dynamics across 100K global cases and inferred inter-country transmission rates.',
			'Identified influential nodes in the global propagation graph to support risk analysis.'
		],
		stack: ['Python', 'Time Series', 'Statistics', 'Graph Analysis']
	}
];

export const projects: ProjectItem[] = [
	{
		name: 'Alex Financial Advisor',
		eyebrow: 'Production-style agentic AI',
		description:
			'An end-to-end AI financial planning product with authenticated user data, asynchronous analysis jobs, retrieval-backed context and a team of specialist agents.',
		proof: '5 specialist agents · 500-scenario retirement simulation',
		stack: ['Next.js', 'FastAPI', 'AWS Lambda', 'Aurora', 'SQS', 'SageMaker', 'Terraform'],
		href: 'https://github.com/8ehrad/alex-financial-advisor',
		featured: true
	},
	{
		name: 'AI Digital Twin',
		eyebrow: 'Grounded personal AI',
		description:
			'The intelligence behind this portfolio: a grounded conversational layer over curated professional context, with session memory and clear hallucination boundaries.',
		proof: 'Bedrock Converse · Serverless memory · Infrastructure as code',
		stack: ['Bedrock', 'FastAPI', 'Lambda', 'API Gateway', 'S3', 'CloudFront', 'Terraform'],
		href: 'https://github.com/8ehrad/twin',
		featured: true
	},
	{
		name: 'Generative AI Price Prediction',
		eyebrow: 'LLM fine-tuning & evaluation',
		description:
			'Fine-tuned Llama 3.1 8B with QLoRA to predict product prices from descriptions, backed by a deliberately curated and balanced training pipeline.',
		proof: '400K+ products · $54.7 mean error · 0.40 RMSLE',
		stack: ['Llama 3.1', 'QLoRA', 'PyTorch', 'Hugging Face', 'BitsAndBytes'],
		href: 'https://github.com/8ehrad/Pricer_Agent',
		featured: true
	},
	{
		name: 'Trading Floor',
		eyebrow: 'Multi-agent simulation',
		description:
			'An agentic trading simulation and AI engineering team exploring tool use, market data, account state, specialist roles and MCP-based orchestration.',
		proof: 'MCP tools · Real-time market context · Multiple model providers',
		stack: ['OpenAI SDK', 'CrewAI', 'MCP', 'Python'],
		href: 'https://github.com/8ehrad/Trading-Floor/tree/master'
	},
	{
		name: 'Movie Analytics Pipeline',
		eyebrow: 'Data engineering',
		description:
			'A Dockerised ETL and analytics pipeline for movie metadata, ratings, box office and review sentiment.',
		proof: 'End-to-end ingestion, transformation and visualisation',
		stack: ['Apache NiFi', 'Python', 'MySQL', 'Grafana', 'Docker'],
		href: 'https://github.com/8ehrad'
	},
	{
		name: 'Bakery Sales Forecasting',
		eyebrow: 'Forecasting & optimisation',
		description:
			'Forecasted daily demand across Co-op product-store combinations, comparing statistical, ensemble and deep-learning approaches.',
		proof: '25%+ new predictive features · R² 0.67',
		stack: ['R', 'Python', 'GLM', 'Random Forest', 'Neural Networks', 'LSTM'],
		href: 'https://github.com/8ehrad/Bakery-Sales-Forecasting'
	}
];

export const skillGroups = [
	{
		name: 'Data Science & Machine Learning',
		description: 'From messy data and statistical reasoning to measurable predictive systems.',
		skills: ['Machine Learning', 'Statistics', 'Feature Engineering', 'Forecasting', 'Time Series', 'NLP', 'Clustering', 'Model Evaluation', 'Deep Learning']
	},
	{
		name: 'AI Engineering',
		description: 'Grounded, evaluated LLM applications and agentic systems.',
		skills: ['LLM Engineering', 'RAG', 'QLoRA', 'Prompt Engineering', 'Agentic AI', 'Multi-agent Systems', 'MCP', 'Bedrock']
	},
	{
		name: 'Data & Platforms',
		description: 'Reliable pipelines, stores and low-latency data products.',
		skills: ['Python', 'SQL', 'BigQuery', 'SQL Server', 'dbt', 'Airbyte', 'Apache NiFi', 'PostgreSQL', 'Power BI']
	},
	{
		name: 'Cloud & Production',
		description: 'The engineering that makes data and AI systems reliable at scale.',
		skills: ['AWS', 'GCP', 'Vertex AI', 'SageMaker', 'Lambda', 'Docker', 'Terraform', 'FastAPI', 'CI/CD', 'Testing']
	}
];

export const education = [
	{
		degree: 'MSc Data Science & Statistics',
		institution: 'Lancaster University',
		period: '2022 — 2023',
		result: 'Distinction · Top 2.5%',
		detail: 'Machine learning, deep learning, statistics, NLP, computer vision and large-scale data engineering.'
	},
	{
		degree: 'BSc Computer Engineering',
		institution: 'Sharif University of Technology',
		period: '2016 — 2021',
		result: 'Gold Medalist · National Olympiad in Informatics',
		detail: 'Algorithms, data structures, probability, statistics, databases and computer systems.'
	}
];

export const principles = [
	['Ground the answer', 'I prefer measured claims, explicit evidence and honest uncertainty over impressive-sounding guesses.'],
	['Build the whole system', 'The model is one component. Data quality, evaluation, APIs, deployment and observability decide whether it is useful.'],
	['Make complexity legible', 'I translate technical decisions into clear trade-offs for engineering, product and non-technical stakeholders.']
];
