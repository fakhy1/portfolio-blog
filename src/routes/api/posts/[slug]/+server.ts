import { db } from '$lib/server/db/index.js';
import { blogPosts } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function PATCH({ request, params, locals }) {
	try {
		if (!locals.isAuthenticated) return json({
			error: {
				message: 'Unauthorized',
				code: 'UNAUTHORIZED'
			}
		}, { status: 401 });

		const { content } = await request.json();

		await db.update(blogPosts).set({ content }).where(eq(blogPosts.slug, params.slug));

		return json({ data: { message: 'Post content updated' } });
	} catch (error) {
		return json({
			error: {
				message: 'Internal server error',
				code: 'INTERNAL_SERVER_ERROR'
			}
		});
	}
}

export async function DELETE({ params, locals }) {
	if (!locals.isAuthenticated) return json({
		error: {
			message: 'Unauthorized',
			code: 'UNAUTHORIZED'
		}
	}, { status: 401 });

	const { slug } = params;

	await db.delete(blogPosts).where(eq(blogPosts.slug, slug));

	return json({ data: { success: true, message: 'Post deleted successfully' } });
}
