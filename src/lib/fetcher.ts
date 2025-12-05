import { PUBLIC_SITE_URL } from '$env/static/public';
import type { ApiErrorResponse, ApiSuccessResponse } from './types';

export async function fetcher<T>(url: string, options?: RequestInit) {
	const apiUrl = url.startsWith('http') ? url : `${PUBLIC_SITE_URL}/api${url}`;

	const res = await fetch(apiUrl, {
		...options,
		method: options?.method || 'GET',
		credentials: 'include'
	});

	const json = (await res.json()) as ApiErrorResponse | ApiSuccessResponse<T>;

	if (!res.ok || json.error) {
		const errorResult = json as ApiErrorResponse;
		throw new Error(errorResult.error?.message || "Internal server error");
	}

	const successResult = json as ApiSuccessResponse<T>;
	return successResult.data;
}
