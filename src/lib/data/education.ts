import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: 'MSc Data Science and Statistics',
		description: 'Graduated with Distinction in the top 2.5% of the cohort, covering machine learning, deep learning, statistical modelling, NLP, computer vision and large-scale data engineering.',
		location: 'Lancaster, UK',
		logo: Assets.Lancaster,
		name: '',
		organization: 'Lancaster University',
		period: { from: new Date(2022, 10, 1), to: new Date(2023, 9, 30) },
		shortDescription: '',
		slug: 'dummy-education-item',
		subjects: ['Python', 'R', 'Machine Learning', 'Deep Learning', 'Statistics', 'NLP', 'Computer Vision', 'Big Data']
	},
	{
		degree: 'BSc Computer Engineering',
		description: 'Gold Medalist in the Iranian National Olympiad in Informatics, with foundations in algorithms, data structures, probability, statistics and computer systems.',
		location: 'Tehran, Iran',
		logo: Assets.SUT,
		name: '',
		organization: 'Sharif University of Technology',
		period: { from: new Date(2016, 9, 23), to: new Date(2021, 7, 28) },
		shortDescription: '',
		slug: 'dummy-education-item-2',
		subjects: ['C/C++', 'SQL', 'Programming', 'Algorithms and Data structures', 'Probability and Statistics', 'Linear Algebra', 'Databases']
	}
];

export const title = 'Education';
