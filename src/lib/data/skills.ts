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
		description: 'A versatile programming language for data science, web development, automation, and AI.',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'r',
		color: 'green',
		description:
			'A statistical computing language widely used for data analysis, visualisation, and machine learning.',
		logo: Assets.R,
		name: 'R',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'sql',
		color: 'blue',
		description:
			'A powerful language for querying, managing, and analysing relational databases.',
		logo: Assets.SQL,
		name: 'SQL',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'cpp',
		color: 'blue',
		description: 'A high-performance programming language used in systems programming, game development, and AI.',
		logo: Assets.Cpp,
		name: 'C++',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'csharp',
		color: 'purple',
		description: 'A modern, object-oriented language for building applications on the .NET framework.',
		logo: Assets.Csharp,
		name: 'C#',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'numpy',
		color: 'orange',
		description:
			'A fundamental Python library for numerical computing and handling multi-dimensional arrays.',
		logo: Assets.Numpy,
		name: 'Numpy',
		category: 'ml'
	}),
	defineSkill({
		slug: 'pandas',
		color: 'cyan',
		description:
			'A Python library for data manipulation and analysis with powerful DataFrame support.',
		logo: Assets.Pandas,
		name: 'Pandas',
		category: 'ml'
	}),
	defineSkill({
		slug: 'tensorflow',
		color: 'orange',
		description: 'An open-source framework for machine learning and deep learning applications.',
		logo: Assets.Tensorflow,
		name: 'TensorFlow',
		category: 'ml'
	}),
	defineSkill({
		slug: 'scikitlearn',
		color: 'blue',
		description: 'A Python library offering simple, efficient tools for machine learning and statistical modelling.',
		logo: Assets.Scikitlearn,
		name: 'Scikit-learn',
		category: 'ml'
	}),
	defineSkill({
		slug: 'powerbi',
		color: 'yellow',
		description: 'A business intelligence tool for data visualisation, reporting, and interactive dashboards.',
		logo: Assets.Powerbi,
		name: 'PowerBI',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'dotnet',
		color: 'purple',
		description: 'A framework for building cross-platform applications, web APIs, and cloud-based services.',
		logo: Assets.Dotnet,
		name: '.Net',
		category: 'web'
	}),
	defineSkill({
		slug: 'django',
		color: 'green',
		description: 'A high-level Python web framework for building secure and scalable applications.',
		logo: Assets.Django,
		name: 'Django',
		category: 'web'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'The foundational language for structuring web content.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'web'
	}), 
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'A stylesheet language for designing and styling web pages.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'web'
	}),
	defineSkill({
		slug: 'azure',
		color: 'blue',
		description: "Microsoft's cloud computing platform for scalable applications, AI, and data analytics.",
		logo: Assets.Azure,
		name: 'Azure',
		category: 'tech'
	}),
	defineSkill({
		slug: 'keras',
		color: 'red',
		description: 'A high-level neural networks API for building deep learning models with TensorFlow.',
		logo: Assets.Keras,
		name: 'Keras',
		category: 'ml'
	}),
	defineSkill({
		slug: 'hf',
		color: 'yellow',
		description: 'A leading AI platform for NLP and machine learning model deployment.',
		logo: Assets.Huggingface,
		name: 'HuggingFace',
		category: 'ml'
	}),
	defineSkill({
		slug: 'matplotlib',
		color: 'blue',
		description: 'A Python library for creating static, animated, and interactive visualisations',
		logo: Assets.Matplotlib,
		name: 'Matplotlib',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'seaborn',
		color: 'blue',
		description: 'A Python library for statistical data visualisation based on Matplotlib.',
		logo: Assets.Seaborn,
		name: 'Seaborn',
		category: 'visualisation'
	}),
	defineSkill({
		slug: 'git',
		color: 'orange',
		description: 'A version control system for tracking code changes and collaboration.',
		logo: Assets.Git,
		name: 'Git',
		category: 'tech'
	}),
	defineSkill({
		slug: 'hadoop',
		color: 'yellow',
		description: 'A framework for distributed storage and big data processing.',
		logo: Assets.Hadoop,
		name: 'Hadoop',
		category: 'tech'
	}),
	defineSkill({
		slug: 'aws',
		color: 'orange',
		description: "Amazon's cloud platform offering scalable computing, storage, and AI services.",
		logo: Assets.AWS,
		name: 'AWS',
		category: 'tech'
	}),
	defineSkill({
		slug: 'docker',
		color: 'blue',
		description: 'A platform for containerizing applications to ensure consistent deployment across environments.',
		logo: Assets.Docker,
		name: 'Docker',
		category: 'tech'
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
