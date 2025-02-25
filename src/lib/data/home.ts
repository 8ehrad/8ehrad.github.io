import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Behrad';

export const lastName = 'Zabihi';

export const description =
	'A data scientist with a strong foundation in machine learning, NLP, and statistics. \
	With experience in building scalable ETL pipelines, automating document processing, and deploying AI-driven solutions, I specialise in transforming complex data into actionable insights. \
	My expertise spans cloud technologies, deep learning frameworks, and data visualisation, enabling businesses to optimise decision-making. \
	Passionate about solving real-world problems, I thrive in collaborative environments where innovation meets impact.';

export const links: Array<{ platform: Platform; link: string }> = [
	{ platform: Platform.GitHub, link: 'https://github.com/8ehrad' },
	{
		platform: Platform.Linkedin,
		link: 'https://www.linkedin.com/in/behrad-zabihi/'
	},
	// {
	// 	platform: Platform.Twitter,
	// 	link: 'https://twitter.com/'
	// },
	// {
	// 	platform: Platform.StackOverflow,
	// 	link: 'https://stackoverflow.com/'
	// },
	{
		platform: Platform.Email,
		link: 'behradz.work@gmail.com'
	},
	// {
	// 	platform: Platform.Youtube,
	// 	link: 'https://www.youtube.com'
	// },
	// {
	// 	platform: Platform.Facebook,
	// 	link: 'https://www.facebook.com'
	// }
];

export const skills = getSkills('python', 'r', 'sql', 'numpy', 'pandas', 'tensorflow', 'scikitlearn', 'powerbi');
