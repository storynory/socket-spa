<script>
	// the final piece of the puzzle is to hand on the data to the card
	import { flip } from 'svelte/animate';
	import PocketBase from 'pocketbase';
	import SocketIcon from '$lib/components/icons/socket.svelte';
	import PostCard from '$lib/components/postCard.svelte';
	import SearchIcon from '$lib/components/icons/searchIcon.svelte';

	import Fuse from 'fuse.js';
	import SearchInput from '$lib/components/search/searchInput.svelte';
	import Pagination from '$lib/components/pagination/paginate.svelte';

	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	let postsData = $props();
	//$inspect("postsData", postsData)
	let posts = $state();

	posts = postsData.data.posts;

	let searchResults = $state();
	let query = $state();

	let pageData = $state({
		posts: postsData.data.posts,
		pageN: 1,
		totalItems: postsData.data.totalItems,
		totalPages: postsData.data.totalPages,
		perPage: postsData.data.perPage,
		isSearch: false,

		searchPage: [] //  this is paginated results
	});

	// @ts-ignore
	let updateSearch = (updates = {}) => {
		pageData = {
			...pageData,
			...updates
		};
	};

	// call back to get page data inside component
	let getPageData = () => {
		let data = pageData;
		return data;
	};

	let changePage = async (page = 1) => {
		let newPosts = await pb.collection('posts').getList(page, pageData.perPage, {
			sort: '-created',
			expand: 'featuredImage'
		});

		posts = newPosts.items;
	};
</script>

<header class="header -m">
	<div class="container page-width -p-x-lg">
		<SearchInput
			updatePostsData={updateSearch}
			perPage={pageData.perPage}
			totalPages={pageData.totalPages}
		/>
	</div>

	<h1>Dashboard</h1>
	<SocketIcon />
</header>
<div class="gallery">
	{#if pageData.isSearch == true}
		{#each pageData.searchPage as post, i (i)}
			<PostCard cardData={post}></PostCard>
		{/each}
	{:else}
		{#each posts as post, i (i)}
			<PostCard cardData={post}></PostCard>
		{/each}
	{/if}
</div>
<footer class="content">
	{#if pageData.isSearch === false}
		<Pagination pageSwitch={changePage} getData={getPageData} />
	{/if}
</footer>

<style>
	.center {
		display: flex;
		align-items: center;
		vertical-align: center;
	}
</style>
