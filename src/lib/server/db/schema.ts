import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuid } from 'uuid';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const blogPosts = sqliteTable('blog_posts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuid()),
	title: text('title').notNull(),
	slug: text('slug').notNull(),
	image: text('image'),
	description: text('description').notNull(),
	content: text('content'),
	isPublished: integer('is_published', { mode: 'boolean' }).default(false),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.$defaultFn(() => new Date())
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
