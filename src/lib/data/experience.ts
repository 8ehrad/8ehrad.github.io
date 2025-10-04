import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: 'data-scientist',
		company: 'Informed Solutions',
		description: `
- Automated Scottish farmers’ funding validation with a multimodal ML pipeline deployed on AWS (Llama, LLaVA,Bedrock, Textract), cutting review time from 2 weeks to real-time and achieving an F1 score of 0.91.
- Built a scalable ETL pipeline using Airbyte and DBT to extract and link EPC and postcode data for 65,000 households in the Isle of Wight, powering an interactive map for household-level EPC insights.
- Built a Power BI dashboard for delivery managers and recruitment team to make real-time data-driven decisions.
- Optimised database design and data modelling, integrating it into interactive dashboards to provide stakeholders with actionable insights for efficient project and resource allocation.
- Developed cloud-based web applications and REST APIs following object-oriented programming principles.
- Applied agile practices with Jira and Git to manage CI/CD pipelines for streamlined integration and testing.
- Communicated complex AI/ML concepts to both technical and non-technical stakeholders.
- Provided continuous client communication, consultancy, and support to build strong relationships. 
    `,
		contract: ContractType.FullTime,
		type: 'Data Science/Software Development',
		location: 'Manchester',
		period: { from: new Date(2023, 10, 21) },
		skills: getSkills('python', 'sql', 'csharp', 'huggingface', 'powerbi', 'airbyte', 'dbt', 'dotnet', 'django', 'html', 'css', 'git', 'aws', 'azure', 'docker'),
		name: 'Data Scientist',
		color: 'red',
		links: [],
		logo: Assets.Informed,
		shortDescription: 'I have worked as a Data Scientist across data science and software development, delivering solutions for various clients. \
			My work mainly involves building data-driven solutions and developing cloud-based web applications.'
	},
	{
		slug: 'data-science-placement',
		company: 'Informed Solutions',
		description: `
- Developed an NLP pipeline for keyword extraction and summarisation of structured and unstructured data.
- Improved topic extraction using BERTopic and LLM-based techniques.
- Used GPT and LangChain to summarise urban planning cases, cutting manual review time by 60% and reaching a BERTScore F1 of 0.84.
    `,
		contract: ContractType.Internship,
		type: 'Data Science',
		location: 'Manchester',
		period: { from: new Date(2022, 5, 5), to: new Date(2022, 8, 30)},
		skills: getSkills('python', 'huggingface'),
		name: 'Data Science Placement',
		color: 'blue',
		links: [],
		logo: Assets.Informed,
		shortDescription: 'During my data science placement, I Extracted key information from diverse and unstructured documents, utilising state-of-the-art NLP methods.'
	},
	{
		slug: 'data-scientist',
		company: 'Mizan Gostaran Sharif',
		description: `
- Scaled resume parsing system from 26K to 500K+ CVs using a custom NLP pipeline for entity extraction.
- Improved job recommendation by clustering CVs using UMAP + HDBSCAN for semantic similarity analysis.
    `,
		contract: ContractType.FullTime,
		type: 'Data Science',
		location: 'Tehran',
		period: { from: new Date(2022, 5, 1), to: new Date(2022, 7, 30) },
		skills: getSkills('python', 'numpy', 'pandas', 'scikitlearn', 'huggingface'),
		name: 'Data Scientist',
		color: 'green',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'I worked on processing and analysing large volumes of user-generated resumes, leveraging NLP techniques to extract and categorise skill sets. \
			This contributed to improving candidate matching and enhancing a job recommendation system.'
	},
	{
		slug: 'ml-research-assistant',
		company: 'Sharif University of Technology',
		description: `
- Modelled Covid-19 propagation network using time series and statistical modelling on 100k global cases.
- Identified key influencers in the global propagation graph by inferring inter-country transmission rates.
    `,
		contract: ContractType.PartTime,
		type: 'Machine Learning',
		location: 'Tehran',
		period: { from: new Date(2021, 1, 1), to: new Date(2021, 6, 22) },
		skills: getSkills('python', 'numpy', 'pandas'),
		name: 'ML Research Assistant',
		color: 'yellow',
		links: [],
		logo: Assets.SUT,
		shortDescription: 'I analysed COVID-19 transmission dynamics using statistical modelling, providing insights to support data-driven decision-making on travel restrictions and risk assessment.'
	}
];

export const title = 'Experience';
