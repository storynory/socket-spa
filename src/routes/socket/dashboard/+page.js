
import PocketBase from 'pocketbase';

 
   const pb = new PocketBase('https://content.socketcms.com');





export async function load({  }) {

    try {
   let  posts = await pb.collection('posts').getList(1, 15, {
        sort: '-created',
        expand: 'featuredImage', 
    });

     return posts

	 } catch (error) {
        console.error('Failed to fetch posts:', error);   
        
    }
}