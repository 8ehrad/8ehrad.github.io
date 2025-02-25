import Assets from './assets';
import type { Skill, SkillCategory } from '../types';
import svelte from '../md/svelte.md?raw';
import { omit, type StringWithAutoComplete } from '@riadh-adrani/utils';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Machine Learning', slug: 'ml' }),
	defineSkillCategory({ name: 'Visualisation', slug: 'visualisation' }),
	defineSkillCategory({ name: 'Web', slug: 'web' }),
	defineSkillCategory({ name: 'Technologies/Frameworks', slug: 'tech' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Langauges', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const items = [
	defineSkill({
		slug: 'python',
		color: 'yellow',
		description: '',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'r',
		color: 'green',
		description:
			'',
		logo: Assets.R,
		name: 'R',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'sql',
		color: 'blue',
		description:
			'',
		logo: Assets.SQL,
		name: 'SQL',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'cpp',
		color: 'blue',
		description: '',
		logo: Assets.Cpp,
		name: 'C++',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'csharp',
		color: 'purple',
		description: '',
		logo: Assets.Csharp,
		name: 'C#',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'numpy',
		color: 'orange',
		description:
			'',
		logo: Assets.Numpy,
		name: 'Numpy',
		category: 'ml'
	}),
	defineSkill({
		slug: 'pandas',
		color: 'cyan',
		description:
			'',
		logo: Assets.Pandas,
		name: 'Pandas',
		category: 'ml'
	}),
	defineSkill({
		slug: 'tensorflow',
		color: 'orange',
		description: '',
		logo: Assets.Tensorflow,
		name: 'TensorFlow',
		category: 'ml'
	}),
	defineSkill({
		slug: 'scikitlearn',
		color: 'blue',
		description: '',
		logo: Assets.Scikitlearn,
		name: 'Scikit-learn',
		category: 'ml'
	}),
	defineSkill({
		slug: 'powerbi',
		color: 'yellow',
		description: '',
		logo: Assets.Powerbi,
		name: 'PowerBI',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'web'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'web'
	}),
	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'library'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: svelte,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'library'
	}), 
	defineSkill({
		slug: 'azure',
		color: 'blue',
		description: '',
		logo: Assets.Azure,
		name: 'Azure',
		category: 'tech'
	}),
	defineSkill({
		slug: 'keras',
		color: 'red',
		description: '',
		logo: Assets.Keras,
		name: 'Keras',
		category: 'ml'
	}),
	defineSkill({
		slug: 'hf',
		color: 'yellow',
		description: '',
		logo: Assets.Huggingface,
		name: 'HuggingFace',
		category: 'ml'
	}),
	defineSkill({
		slug: 'matplotlib',
		color: 'blue',
		description: '',
		logo: Assets.Matplotlib,
		name: 'Matplotlib',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'seaborn',
		color: 'blue',
		description: '',
		logo: Assets.Seaborn,
		name: 'Seaborn',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'dotnet',
		color: 'purple',
		description: '',
		logo: Assets.Dotnet,
		name: '.Net',
		category: 'web'
	}),
	defineSkill({
		slug: 'git',
		color: 'orange',
		description: '',
		logo: Assets.Git,
		name: 'Git',
		category: 'tech'
	}),
	defineSkill({
		slug: 'hadoop',
		color: 'yellow',
		description: '',
		logo: Assets.Hadoop,
		name: 'Hadoop',
		category: 'tech'
	}),
	defineSkill({
		slug: 'aws',
		color: 'orange',
		description: '',
		logo: Assets.AWS,
		name: 'AWS',
		category: 'tech'
	}),
	defineSkill({
		slug: 'django',
		color: 'green',
		description: '',
		logo: Assets.Django,
		name: 'Django',
		category: 'web'
	}),
] as const;

export const title = 'Skills';

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => items.filter((it) => slugs.includes(it.slug));

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};
