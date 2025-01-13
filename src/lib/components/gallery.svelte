<script lang="ts">
	import { imageresize, imagesq } from '$lib/images.js';

	let { gallery, SaveImageCallback } = $props();

	let imageDetails = $state('');

	// we will swap this out for a callback function that updates the featured image details
	// in the case of insert into quill we will call it with a different callback
</script>

<div class="gallery container">
	{#each gallery as image}
		<figure>
			<header class="center"><h3 class="center">{image.title}</h3></header>
			<button
				type="button"
				aria-label="Select image: {image.title}"
				onclick={() => SaveImageCallback(image.id)}
			>
				<img src="{imagesq}/200/{image.id}/{image.image}" alt={image.alt} />
			</button>
		</figure>
	{/each}
</div>

<style>
</style>
