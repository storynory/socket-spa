<script>
	// @ts-nocheck
	import { setContext } from 'svelte';
	import Toolbar from '$lib/components/editors/toolbar.svelte';
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils/slugify.js';
	import { page } from '$app/stores';
	import { pb, pblocation } from '$lib/pocketbase.svelte.js';
	import { imageresize, imagesq } from '$lib/images.js';
	import Gallery from '$lib/components/gallery.svelte';
	import { cleanHtml } from '$lib/utils/domPurify.js';
	import TipTapEditor from '$lib/components/editors/tiptap.svelte';

	/*******************/

	let propsData = $props();
	//$inspect(propsData)
	let pageState = $state({
		title: propsData.data.post.title,
		collectionName: propsData.data.post.collectionName,
		contents: cleanHtml(propsData.data.post.contents),
		excerpt: propsData.data.post.excerpt,
		featuredImage: propsData.data.post.expand.featuredImage, // id of the FeaturedImage from the images
		featuredImageId: propsData.data.post.featuredImage.id, // for saving the post
		id: propsData.data.post.id,
		slug: propsData.data.post.slug,
		updated: propsData.data.post.updated,
		created: propsData.data.post.created,
		message: ''
	});

	// Define methods for interacting with `pageState`
	function updatePageState(updater) {
		updater(pageState); // Allow passing a function to update `pageState`
	}

	function getPageState() {
		return pageState; // Provide a read-only version of `pageState`
	}

	// Set the context with the state and methods
	//setContext('pageState', { pageState, updatePageState, getPageState });

	let images = propsData.data.images.items;
	setContext('pageState', { pageState, updatePageState, getPageState, images });

	const updateMessage = (message = '') => {
		pageState.message = message;
	};

	let saveData = {};

	const savePost = () => {
		saveData = {
			title: pageState.title,
			slug: pageState.slug,
			contents: cleanHtml(pageState.contents),
			excerpt: pageState.excerpt,
			featuredImage: pageState.featuredImageId
		};
		return saveData;
	};

	const updatePage = async () => {
		try {
			if (pageState.id) {
				await pb.collection('posts').update(pageState.id, savePost());
				pageState.contents = saveData.contents;

				updateMessage('Post Updated');
			} else {
				const createdPost = await pb.collection('posts').create(savePost());
				pageState.id = createdPost.id;
				updateMessage('Post Created');
			}

			if (pageState.featuredImageData) {
				await pb.collection('images').update(pageState.featuredImage, {
					alt: pageState.altText,
					title: pageState.imageTitle
				});
			}
		} catch (error) {
			console.error('Failed to save post.', error);
			updateMessage('Post Failed to Save', error);
		}
	};

	function handleKeydown(event) {
		if ((event.ctrlKey || event.metaKey) && event.key === 's') {
			event.preventDefault();
			updatePage();
		}
	}

	let dialog;

	const openModal = () => {
		dialog.showModal();
	};
	const closeModal = () => {
		dialog.close();
	};

	// I need a function to get the featured image and update pageState
	// in SSR this would run on server but has to run in browser here

	const saveFeaturedImage = async (imageData) => {
		// pass this function into the Gallery Component
		pageState.featuredImageId = imageData.id;
		const image = await pb.collection('images').getOne(imageData.id, {});
		pageState.featuredImage = image;
		console.log('image saved', image);
		dialog.close();
	};

	function handleContentUpdate(updatedContent) {
		pageState.contents = updatedContent; // Update pageState when content changes
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="container">
	<form
		class="form editForm -p"
		onsubmit={(e) => {
			e.preventDefault();
			updatePage();
		}}
	>
		<div id="editorContainer" class="placeholder contentEditor -p">
			<input
				id="postTitle"
				class="h1 container"
				bind:value={pageState.title}
				placeholder="New Post Title"
				aria-label="Post Title"
			/>

			<TipTapEditor
				initialContent={pageState.contents}
				onContentUpdate={handleContentUpdate}
				{images}
			/>
		</div>

		<div class="-m-y">
			<textarea bind:value={pageState.contents} class=" container input"></textarea>
		</div>
		<button>html</button>

		<textarea class="input -m-y" bind:value={pageState.excerpt}> </textarea>

		{pageState.message}

		<button type="submit" class="btn save">Save Post</button>

		{#if pageState.featuredImage?.id}
			<figure class="figure -m-y">
				<img
					src="{imagesq}/300/{pageState.featuredImage.id}/{pageState.featuredImage.image}"
					alt="big fat moma"
				/>
			</figure>
		{/if}

		<dialog class="dialog page" bind:this={dialog}>
			<button class="btn" onclick={closeModal}>Close</button>
			<Gallery gallery={images} onImageSelect={saveFeaturedImage} />
		</dialog>

		<button class="btn full" onclick={openModal}>Set Featured Image</button>
	</form>
	<Toolbar />
</div>

<style>
	.contentEditor {
		position: relative;
		width: 100%;
	}

	.btn.full {
		width: 100%;
	}

	.btn.save {
		background-color: green;
	}

	/*   Open state of the dialog  */
	dialog[open] {
		opacity: 1;
		transform: scaleY(1);
	}

	/*   Closed state of the dialog   */
	dialog {
		width: 100%;

		opacity: 0;
		transform: translateY(0px);
		transition:
			opacity 0.7s ease-out,
			transform 0.9s ease-out,
			overlay 0.7s ease-out allow-discrete,
			display 0.7s ease-out allow-discrete;
		/* Equivalent to
  transition: all 0.7s allow-discrete; */
	}

	/*   Before-open state  */
	/* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
	@starting-style {
		dialog[open] {
			opacity: 0;
			transform: translateY(50px);
		}
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0%);
		transition:
			display 0.7s allow-discrete,
			overlay 0.7s allow-discrete,
			background-color 0.7s;
		/* Equivalent to
  transition: all 0.7s allow-discrete; */
	}

	dialog[open]::backdrop {
		background-color: rgb(0 0 0 / 75%);
	}

	/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

	@starting-style {
		dialog[open]::backdrop {
			background-color: rgb(0 0 0 / 0%);
		}
	}
</style>
