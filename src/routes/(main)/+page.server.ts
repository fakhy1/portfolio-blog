import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import { blogPosts } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

async function getPosts(isPublished: boolean) {
	return await db
		.select({
			id: blogPosts.id,
			title: blogPosts.title,
			slug: blogPosts.slug,
			description: blogPosts.description,
			createdAt: blogPosts.createdAt
		})
		.from(blogPosts)
		.where(eq(blogPosts.isPublished, isPublished))
		.orderBy(desc(blogPosts.createdAt));
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const { isAuthenticated } = locals;
	const type = url.searchParams.get('type');

	const posts = isAuthenticated
		? type === 'draft'
			? await getPosts(false)
			: await getPosts(true)
		: await getPosts(true);

	return { posts, postType: type || 'published' };
};
