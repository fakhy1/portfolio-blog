interface BlogPost {
	id: string;
	title: string;
	slug: string;
	description: string;
	content: string;
	createdAt: string;
}

export const posts: BlogPost[] = [
	{
		id: '1',
		title: 'Why you should focus on your CS Degree?',
		slug: 'why-you-should-focus-on-your-cs-degree',
		description: 'This is a sample description for my first blog post.',
		content: `
    ### My First Blog Post

    This is a sample content for my first blog post.
    ### Sample Post Title

    This is the content for a new sample post. It can include **bold text**, *italic text*, and even [links](https://example.com).

    Here's a list:
    - Item 1
    - Item 2
    - Item 3

    And a code block:
    `,
		createdAt: '2023-04-01'
	},
	{
		id: '4',
		title: 'Quantum Computing will get fame in 2030',
		slug: 'a-new-sample-post',
		description: 'This is a brief description for a newly generated sample post.',
		content: `

    `,
		createdAt: '2023-01-15'
	},
	{
		id: '2',
		title: 'Another Exciting Post',
		slug: 'another-exciting-post',
		description: 'Discover new insights in this thrilling article.',
		content: '',
		createdAt: '2023-02-20'
	},
	{
		id: '3',
		title: 'SvelteKit Tips and Tricks',
		slug: 'sveltekit-tips-and-tricks',
		description: 'Learn how to get the most out of SvelteKit.',
		content: '',
		createdAt: '2023-03-10'
	}
];
