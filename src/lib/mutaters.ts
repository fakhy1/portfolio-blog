import { goto, invalidate } from '$app/navigation';
import { toast } from 'svelte-sonner';
import { fetcher } from './fetcher';

export async function updatePostStatus({
	slug,
	status
}: {
	slug: string;
	status: 'publish' | 'draft';
}) {
	try {
		await fetcher<{ slug: string }>(`/posts/${slug}/${status}`, {
			method: 'PATCH'
		});

		invalidate(`path:/posts/${slug}`);
		toast.success(`Post ${status}ed.`);
	} catch (error) {
		const err = error as Error;
		toast.error(err.message);
	}
}

export async function deletePost(slug: string) {
	try {
		const response = await fetcher<{ message: string }>(`/posts/${slug}`, {
			method: 'DELETE'
		});

		toast.success(response.message);
		goto(`/`);
	} catch (error) {
		const err = error as Error;
		toast.error(err.message);
	}
}

let timeoutId: NodeJS.Timeout;
export function updatePostContent(slug: string, content: string) {
	const SAVE_AFTER_TIME = 5000; // 5s

	if (timeoutId) clearTimeout(timeoutId);

	timeoutId = setTimeout(async () => {
		try {
			const response = await fetcher<{ message: string }>(`/posts/${slug}`, {
				method: 'PATCH',
				body: JSON.stringify({ content })
			});

			toast.success(response.message);
		} catch (error) {
			const err = error as Error;
			toast.error(err.message);
		}
	}, SAVE_AFTER_TIME);
}
