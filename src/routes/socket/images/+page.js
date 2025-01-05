
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
const pb = new PocketBase(PUBLIC_POCKETBASE_URL);


export async function load({  }) {

    try {
   let  images = await pb.collection('images').getList(1, 15, {
        sort: '-created',
    });

     return images;

	 } catch (error) {
        console.error('Failed to fetch images:', error);   
        
    }
}