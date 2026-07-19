import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Behrad';

export const lastName = 'Zabihi';

export const description =
	'I build intelligent systems that survive contact with the real world — from production ML and multimodal AI pipelines to fine-tuned LLMs and multi-agent products.';

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
