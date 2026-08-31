import { request } from './api';

export type MetricsRange = '24h' | '7d' | '30d';

export interface SystemMetrics {
	range: MetricsRange;
	generated_at: string;
	traffic: {
		page_views: number;
		cloudfront_requests: number;
		average_page_load_ms: number;
		javascript_errors: number;
		browser_http_5xx: number;
		cloudfront_4xx_rate: number;
		cloudfront_5xx_rate: number;
		top_pages: Array<{ path: string; views: number }>;
	};
	twin: {
		chat_requests: number;
		chat_failures: number;
		semantic_fallbacks: number;
		average_retrieval_ms: number;
		average_model_ms: number;
		input_tokens: number;
		output_tokens: number;
		api_5xx: number;
	};
	career_agent: { api_errors: number; scheduled_errors: number };
	series: Array<{
		timestamp: string;
		page_views: number;
		chat_requests: number;
		chat_failures: number;
	}>;
	notes: string[];
}

export function getSystemMetrics(range: MetricsRange): Promise<SystemMetrics> {
	return request<SystemMetrics>(`/metrics?range=${range}`);
}
