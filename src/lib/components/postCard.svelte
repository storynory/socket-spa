<script>
	// @ts-nocheck

	import { imageresize } from '$lib/images.js';
	let { cardData } = $props();
</script>

<div class="card bg-light">
	<header class="--brd-none --txt-center">
		<h3 class="--brd-none">{cardData.title}</h3>
	</header>
	{#if cardData.expand?.featuredImage}
		<a href="/socket/posts/{cardData.id}">
			<figure class="-p">
				<img
					src="{imageresize}/600/{cardData.expand.featuredImage.id}/{cardData.expand.featuredImage
						.image}"
					alt={cardData.expand.featuredImage.alt || alt || title || 'portrait'}
					width="600px"
				/>
				<figcaption><p>{cardData.excerpt}</p></figcaption>
			</figure>
		</a>
	{/if}

	<footer><a href="/socket/posts/{cardData.id}" class="btn">Edit</a></footer>
</div>

<style>
	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		min-width: 300px;
		max-width: 800px;
		padding: 0.5em;
		align-items: center;
		margin: auto;
	}
</style>
