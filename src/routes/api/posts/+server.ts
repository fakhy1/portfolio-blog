import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import type { Post } from '$lib/types';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	title: z.string().trim().min(1).max(55),
	slug: z.string().trim().min(1).max(55),
	description: z.string().trim(),
	image: z.string().trim().optional()
});

export async function POST({ locals, request }) {
	try {
		if (!locals.isAuthenticated) return json({ error: 'Unauthorized' }, { status: 401 });

		const data = await request.json();
		const { success, data: parsedData, error } = schema.safeParse(data);

		if (!success) return json({ error: error.issues[0].message }, { status: 400 });
		const result = await db
			.insert(blogPosts)
			.values([
				removeUndefinedNullEmpty<Pick<Post, 'title' | 'slug' | 'description' | 'image'>>(parsedData)
			])
			.returning({
				slug: blogPosts.slug
			});

		return json({ data: { slug: result[0].slug } }, { status: 201 });
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Remove undefined, null, "" function
function removeUndefinedNullEmpty<T>(obj: any): T {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== '')
	) as T;
}
