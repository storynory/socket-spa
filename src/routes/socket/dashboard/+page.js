import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export async function load({}) {
	try {
		let posts = await pb.collection('posts').getList(1, 6, {
			sort: '-created',
			expand: 'featuredImage'
		});
		console.log('js', posts);

		return {
			posts: posts.items,
			page: posts.page,
			perPage: posts.perPage,
			totalPages: posts.totalPages,
			totalItems: posts.totalItems
		}; // Return the list of posts
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return { posts: [] }; // Return empty posts in case of an error
	}
}
