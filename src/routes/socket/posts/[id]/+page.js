import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase.svelte.js';

export const load = async ({ params }) => {
	try {
		const [post, images] = await Promise.all([
			pb.collection('posts').getOne(params.id, { expand: 'featuredImage' }),
			pb.collection('images').getList(1, 20, { sort: '-created' })
		]);

		if (!post) {
			throw error(404, { message: 'Not found' });
		}

		return { post, images };
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, { message: err.message });
		}
		throw error(500, { message: 'An unknown error occurred' });
	}
};
