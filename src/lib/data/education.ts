import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: "Master's degree of Data Science",
		description: 'Fast-paced wholesome course in Data Science, covering a variety of subjects in the realm of Data Science, \
			including machine learning, deep learning, statistical modelling, data engineering, and big data. I finished with a high distinction, \
			ranking 3rd in our cohort among 120 students.',
		location: 'United Kingdom',
		logo: Assets.Lancaster,
		name: '',
		organization: 'Lancaster University',
		period: { from: new Date(2022, 10, 1), to: new Date(2023, 9, 30) },
		shortDescription: '',
		slug: 'dummy-education-item',
		subjects: ['Python', 'R', 'Machine Learning', 'Deep Learning', 'Statistics', 'NLP', 'Computer Vision', 'Big Data']
	},
	{
		degree: 'Bachelor degree of Computer Engineering',
		description: '',
		location: 'Iran',
		logo: Assets.SUT,
		name: '',
		organization: 'Sharif University of',
		period: { from: new Date(2016, 9, 23), to: new Date(2021, 7, 28) },
		shortDescription: '',
		slug: 'dummy-education-item-2',
		subjects: ['C/C++', 'SQL', 'Programming', 'Algorithms and Data structures', 'Probability and Statistics', 'Linear Algebra', 'Databases']
	}
];

export const title = 'Education';
