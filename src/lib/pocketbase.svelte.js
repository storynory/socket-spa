
import PocketBase from 'pocketbase';
export const imageresize = ('https://content.socketcms.com/images')
export const imagesq = ('https://content.socketcms.com/images/sq')

// Initialize PocketBase
export const pb = new PocketBase('https://content.socketcms.com');
// for api images 
export const pblocation = ('https://content.socketcms.com/api/files/');


// Logout function: Clears the authentication store and resets the user state
export function logout() {
    pb.authStore.clear(); // Clear PocketBase's auth store 
}




