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
		slug: 'movie-sentiment-analysis',
		color: '#5e95e3',
		description: `
- Designed and executed a scalable, end-to-end ETL data engineering pipeline to collect movies information from the IMDB website, perform sentiment analysis on movie
        reviews, and visualise the results.
- Demonstrated high adaptability and quick learning capabilities, mastering new concepts efficiently within a tight timeframe.
    `,
		shortDescription:
			"I designed and implemented a scalable end-to-end ETL pipeline to extract movie information from IMDB, perform sentiment analysis on reviews, and visualise the results. \
			Showcased adaptability and fast learning by mastering new concepts within tight timeframe.",
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Scalable ETL Pipeline for Movie Data and Sentiment Analysis',
		period: {
			from: new Date(2023, 2, 1), 
			to: new Date(2023, 3, 1)
		},
		skills: getSkills('python', 'nifi', 'grafana'),
		type: 'Data Engineering'
	},
	{
		slug: 'big-data-pipeline',
		color: '#5e95e3',
		description: `
- Designed and implemented a successful Big Data pipeline to understand the operational behaviour of one of Google's data centre clusters.
- Established a distributed computing environment by connecting multiple machines together, utilising the Hadoop framework for data node distribution, and executing queries on the resultant big data using Hive.
- Exhibited strong communication and leadership abilities, effectively driving team collaboration towards the successful completion of group project.
    `,
		shortDescription:
			'I developed a Big Data pipeline to analyze Google data center operations, leveraging distributed computing to process large-scale datasets efficiently.',
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Big Data Pipeline',
		period: {
			from: new Date(2023, 1, 1), 
			to: new Date(2023, 2, 30)
		},
		skills: getSkills('hadoop'),
		type: 'Big Data'
	},
	{
		slug: 'decision-tree',
		color: '#5e95e3',
		description: `
- Implemented a Decision Tree classifier from scratch in Python (OOP), comparing performance metrics and computational aspects against a Sklearn library implementation, demonstrating good Python coding practices.
- Utilised unit tests for comprehensive code verification, and conducting in-depth statistical analysis in R, using techniques like linear regression, t-tests, and ggplot2 for data visualisation.
    `,
		shortDescription:
			'I Built a Decision Tree classifier from scratch in Python (OOP) and compared it to Scikit-Learn’s version. Applied unit tests for validation and conducted statistical analysis in R using regression, t-tests, and ggplot2.',
		// links: [{ to: 'https://github.com/RiadhAdrani/slick-portfolio-svelte', label: 'GitHub' }],
		logo: Assets.Lancaster,
		name: 'Building and Evaluating a Decision Tree Classifier',
		period: {
			from: new Date(2022, 11, 1), 
			to: new Date(2023, 0, 15)
		},
		skills: getSkills('python', 'r'),
		type: 'Machine Learning and Statistical Analysis'
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
			from: new Date(2023, 0, 1), 
			to: new Date(2023, 2, 1)
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
			from: new Date(2022, 9, 1), 
			to: new Date(2023, 0, 1)
		},
		skills: getSkills('r'),
		type: 'Forecasting',
		screenshots: []
	}
];

export const title = 'Projects';
