import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: 'data-scientist',
		company: 'Informed Solutions',
		description: `
- Automated farmers’ funding validation pipeline leveraging NLP and computer vision to reduce manual review time by 2 weeks per case.
- Built a Power BI dashboard for delivery managers and recruitment team to make real-time data-driven decisions.
- Optimised database design and data modelling, integrating it into interactive dashboards to provide stakeholders with actionable insights for efficient project and resource allocation.
- Developed a scalable ETL pipeline using Airbyte and DBT for the National Digital Twin Programme (NDTP) to extract EPC data, linking it to house postcodes for real-time visualisation and energy efficiency insights.
- Developed cloud-based web applications and REST APIs following object-oriented programming principles.
- Applied agile practices with Jira and Git to manage CI/CD pipelines for streamlined integration and testing.
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
- Automated planning applications by extracting key information from unstructured documents to reduce review time.
- Utilised keyword extraction and LLM-based summarisation to create concise document summaries for assessors.
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
- Developed a scalable NLP pipeline, automating resume processing and increasing throughput from 26K to 500K+ CVs.
- Clustered semi-structured and unstructured resume data to optimise candidate-job matching based on relevance.
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
- Modelled the spread of COVID-19 using statistical techniques, analysing transmission dynamics between countries.
- Enabled authorities to make informed decisions regarding travel bans from high-risk countries to limit the spread of the virus.
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
