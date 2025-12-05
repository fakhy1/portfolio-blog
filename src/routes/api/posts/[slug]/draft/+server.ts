import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function PATCH({ params, locals }) {
	try {
		if (!locals.isAuthenticated)
			return json({
				error: {
					message: 'Unauthorized',
					code: 'UNAUTHORIZED'
				}
			});

		const { slug } = params;
		const [updatedPost] = await db
			.update(blogPosts)
			.set({ isPublished: false })
			.where(eq(blogPosts.slug, slug))
			.returning({
				slug: blogPosts.slug
			});

		return json({ data: { slug: updatedPost.slug } });
	} catch (error) {
		return json({
			error: {
				message: 'Internal server error',
				code: 'INTERNAL_SERVER_ERROR'
			}
		});
	}
}
