<script>
   import PocketBase from 'pocketbase';
   import SocketIcon from '$lib/components/icons/socket.svelte'
   import PostCard from '$lib/components/postCard.svelte'
   import { shared } from '$lib/shared.svelte.js';
   import SearchInput from '$lib/components/search/searchInput.svelte'

 let postsData = $props(); 
 let postdata = postsData.data.posts  // abrieviate
  
 /* we give post data to search to load initial posts
   the search input updates the shared state of shared.searchItems.searchResults 
    and the result updates  
   */
 
</script>   
    
    <SearchInput posts={postdata} />
  

<header class="header =m">


<h1>Dashboard</h1>
    <SocketIcon />
</header>
<div class="gallery">
    {#if postdata}
        {#each shared.searchItems.searchResults as post }
        <PostCard cardData={post}></PostCard>
    {/each}
    {/if }
</div>

<style>

.center {
    display: flex;
    align-items: center;
    vertical-align: center;
  }
</style>