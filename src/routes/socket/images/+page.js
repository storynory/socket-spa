
import PocketBase from 'pocketbase';

 
   const pb = new PocketBase('https://content.socketcms.com');


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