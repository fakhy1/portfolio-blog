import { faker } from '@faker-js/faker';
import { db } from './server/db';
import { blogPosts } from './server/db/schema';

export async function seedData() {
	const TOTAL_INSERTION = 15;
	for (let index = 0; index <= TOTAL_INSERTION; index++) {
		const post = {
			title: faker.book.title(),
			slug: faker.book.title().toLowerCase().replaceAll(' ', '-'),
			description: faker.book.title(),
			image: faker.image.url(),
			isPublished: faker.number.int({ min: 0, max: 1 }) === 1
		};

		await db.insert(blogPosts).values(post);
	}
}
