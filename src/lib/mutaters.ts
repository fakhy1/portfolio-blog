import { goto, invalidate } from '$app/navigation';
import { toast } from 'svelte-sonner';
import { fetcher } from './fetcher';
import type { Writable } from 'svelte/store';

export async function updatePost({
	slug,
	updates,
	isUpdating
}: {
	slug: string;
	updates: {
		title?: string;
		slug?: string;
		description?: string;
		image?: string;
	};
	isUpdating?: Writable<boolean>;
}) {
	try {
		isUpdating?.update(() => true)
		await fetcher<{ slug: string }>(`/posts/${slug}`, {
			method: 'PUT',
			body: JSON.stringify(updates)
		});

		goto(`/posts/${updates.slug}`);
		invalidate(`path:/posts/${updates.slug}`);
		toast.success(`Post updated.`);
	} catch (error) {
		const err = error as Error;
		toast.error(err.message);
	} finally {
		isUpdating?.update(() => false)
	}
}

export async function updatePostStatus({
	slug,
	status,
	isUpdating
}: {
	slug: string;
	status: 'publish' | 'draft';
	isUpdating?: Writable<boolean>;
}) {
	try {
		isUpdating?.update(() => true)
		await fetcher<{ slug: string }>(`/posts/${slug}/${status}`, {
			method: 'PATCH'
		});

		invalidate(`path:/posts/${slug}`);
		toast.success(`Post ${status}ed.`);
	} catch (error) {
		const err = error as Error;
		toast.error(err.message);
	} finally {
		isUpdating?.update(() => false)
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
export function updatePostContent({
	slug,
	content,
}: {
	slug: string;
	content: string;
}) {
	const SAVE_AFTER_TIME = 2000; // 2s

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
