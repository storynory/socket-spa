<script>
   import PocketBase from 'pocketbase';
   import SocketIcon from '$lib/components/icons/socket.svelte'
   import PostCard from '$lib/components/postCard.svelte'
  
   let postsData = $props();
     let posts = postsData.data.items

</script>


<header class="header =m">

<h1>Dashboard</h1>
    <SocketIcon />
</header>
<div class="gallery">
    {#each posts as post }
    <PostCard cardData={post}></PostCard>

    {/each}
</div>