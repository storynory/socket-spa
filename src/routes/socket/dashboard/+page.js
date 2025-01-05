
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
 
   const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

   export async function load({ }) {
   
    try {
        let posts = await pb.collection('posts').getList(1, 15, {
            sort: '-created',
            expand: 'featuredImage',
        });
         
        return { posts: posts.items }; // Return the list of posts
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return { posts: [] }; // Return empty posts in case of an error
    }
}