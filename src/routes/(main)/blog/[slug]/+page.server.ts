import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { blogPosts } from '$lib/server/db/schema';

export const load = async ({ params, locals, depends }) => {
	const { slug } = params;
	depends(`path:/posts/${slug}`);
	const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
	return post && (post.isPublished === true || locals.isAuthenticated)
		? {
			post,
			params,
			enableEditor: locals.isAuthenticated
		}
		: {
			post: null,
			params,
			enableEditor: false
		};
};
