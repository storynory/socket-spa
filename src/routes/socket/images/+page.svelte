<script>
    import PocketBase from 'pocketbase';
    import { onMount } from 'svelte';
       import SocketIcon from '$lib/components/icons/socket.svelte'
   
       let imagesData = $props(); 
       let images = imagesData.data.items

   
   </script>
   å 
   
   {#each images as image }
   <h2>{image.title}</h2>
   
   {/each}