<script>
	import Gallery from '$lib/components/gallery.svelte';

	let imagesData = $props();
	let images = imagesData.data.items;

	let onImageSelect = (imageId) => {
		// does nothing but gallery requires it.. might make that optional
		return;
	};
</script>

<Gallery gallery={images} {onImageSelect} />
