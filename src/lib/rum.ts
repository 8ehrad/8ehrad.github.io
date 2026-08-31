import type { AwsRumConfig } from 'aws-rum-web';

let started = false;

export async function initialiseRum(): Promise<void> {
	if (started || typeof window === 'undefined' || window.location.pathname.startsWith('/career'))
		return;

	const appMonitorId = import.meta.env.VITE_RUM_APP_MONITOR_ID || '';
	const region = import.meta.env.VITE_RUM_REGION || '';
	if (!appMonitorId || !region) return;

	started = true;
	try {
		const { AwsRum } = await import('aws-rum-web');
		const config: AwsRumConfig = {
			sessionSampleRate: 1,
			endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
			telemetries: ['performance', 'errors', 'http'],
			allowCookies: false,
			enableXRay: false,
			signing: false
		};
		new AwsRum(appMonitorId, '1.0.0', region, config);
	} catch (error) {
		started = false;
		console.warn('Browser telemetry could not start.', error);
	}
}
