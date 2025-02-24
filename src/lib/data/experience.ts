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
		period: { from: new Date(2023, 11, 21) },
		skills: getSkills('ts', 'js'),
		name: 'Technical Consultant',
		color: 'red',
		links: [],
		logo: Assets.Informed,
		shortDescription: 'I have worked as a Technical Consultant across data science and software development, delivering solutions for various clients. \
			My work involves building data-driven systems, developing scalable pipelines, and designing cloud-based applications. \
			I specialise in leveraging AI, data science, and analytics to optimise processes and drive impactful business outcomes while collaborating closely with stakeholders to ensure effective solutions.'
	},
	{
		slug: 'software-freelance',
		company: 'Self-employed',
		description: 'Creating awesome applications for customers.',
		contract: ContractType.Freelance,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date() },
		skills: getSkills('svelte', 'ts', 'sass', 'css', 'html', 'js'),
		name: 'Freelancer',
		color: 'blue',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Creating awesome applications for customers.'
	},
	{
		slug: 'software-freelance-junior',
		company: 'Self-employed',
		description: 'Creating awesome applications for customers.',
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
