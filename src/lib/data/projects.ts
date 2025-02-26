import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from '../types';

export const items: Array<Project> = [
	{
		slug: 'lstm-research',
		color: '#5e95e3',
		description: `
- Investigated LSTM vulnerability to spurious correlations, revealing significant performance drops with manipulated REAL/FAKE news dataset.
- Applied Grad-CAM to uncover model's tendency to learn false features, emphasising the need for robustness against spurious correlations in real-world applications.
- Demonstrated critical thinking and a strong capability to conduct in-depth analytical research.
    `,
		shortDescription:
			"I Explored how LSTMs are susceptible to spurious correlations in a REAL/FAKE news dataset, revealing significant performance drops when manipulated. \
			Applied Grad-CAM to visualise the model's reliance on false features, highlighting the importance of robustness in real-world applications. \
			Demonstrated strong analytical research and critical thinking in evaluating model reliability.",
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Investigating LSTM Vulnerability to Spurious Correlations',
		period: {
			from: new Date(2023, 2, 1), 
			to: new Date(2023, 4, 1)
		},
		skills: getSkills('python', 'tensorflow', 'scikitlearn'),
		type: 'AI Research'
	},
	{
		slug: 'big-data-pipeline',
		color: '#5e95e3',
		description: `
- Built a Big Data pipeline to analyse Google data centre operations.
- Deployed a distributed computing environment with Hadoop for large-scale data processing.
    `,
		shortDescription:
			'I developed a Big Data pipeline to analyze Google data center operations, leveraging distributed computing to process large-scale datasets efficiently.',
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Big Data Pipeline',
		period: {
			from: new Date()
		},
		skills: getSkills('hadoop'),
		type: 'Data Engineering'
	},
	{
		slug: 'Face2Sketch',
		color: '#ff3e00',
		description: `
- Used CAEs and GANs for facial recognition and image translation.
- Generated facial sketches from photos and reconstructed photos from sketches.`,
		shortDescription:
			'I worked with deep learning techniques for facial recognition and image translation, using generative models to convert photos into sketches and reconstruct images from sketches.',
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Face2Sketch and Sketch2Face',
		period: {
			from: new Date()
		},
		skills: getSkills('python', 'tensorflow', 'keras'),
		type: 'Deep Learning',
		screenshots: []
	},
	{
		slug: 'coop',
		color: '#ff3e00',
		description: `Applied time-series forecasting to optimise baked goods production, minimising waste and clearance items.`,
		shortDescription:
			'I used time-series forecasting to optimise baked goods production, improving efficiency and reducing waste.',
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Co‑Op Bakery Forecasting',
		period: {
			from: new Date()
		},
		skills: getSkills('r'),
		type: 'Forecasting',
		screenshots: []
	}
];

export const title = 'Projects';
