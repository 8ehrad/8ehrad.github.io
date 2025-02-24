import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: 'technical-associate',
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
		period: { from: new Date(2023, 11, 1) },
		skills: getSkills('ts', 'js'),
		name: 'Technical Consultant',
		color: 'red',
		links: [],
		logo: Assets.Informed,
		shortDescription: 'I have worked as a Technical Consultant across data science and software development, delivering solutions for various clients. \
			My work mainly involves building data-driven solutions and developing cloud-based web applications.'
	},
	{
		slug: 'data-science-placement',
		company: 'Informed Solutions',
		description: '',
		contract: ContractType.Internship,
		type: 'Data Science',
		location: 'Manchester',
		period: { from: new Date(2022, 6, 5), to: new Date(2022, 9, 30)},
		skills: getSkills('svelte', 'ts', 'sass', 'css', 'html', 'js'),
		name: 'Data Science Placement',
		color: 'blue',
		links: [],
		logo: Assets.Informed,
		shortDescription: 'During my data science placement, I worked on automating document analysis using NLP and machine learning to streamline information extraction and improve assessment efficiency.'
	},
	{
		slug: 'software-freelance-junior',
		company: 'Self-employed',
		description: `
- Automated planning applications by extracting key information from unstructured documents to reduce review time.
- Utilised keyword extraction and LLM-based summarisation to create concise document summaries for assessors.
    `,
		contract: ContractType.Freelance,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2022, 0, 1), to: new Date() },
		skills: getSkills('css', 'html', 'js'),
		name: 'Junior Freelancer',
		color: 'green',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Creating awesome applications for customers.'
	}
];

export const title = 'Experience';
