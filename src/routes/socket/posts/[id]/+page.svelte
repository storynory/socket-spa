<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils/slugify.js';
	import { page } from '$app/stores';
	import { quillOptions } from '$lib/quillConfig.js';
	import { pb, pblocation } from '$lib/pocketbase.svelte.js';
	import { imageresize, imagesq } from '$lib/images.js';
	import Gallery from '$lib/components/gallery.svelte';
	import sanitizeHtml from 'sanitize-html';
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';

	const cleanHtml = (dirtyHtml) => {
		const sanitizedHtml = sanitizeHtml(dirtyHtml, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat([
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6', // Headings
				'ul',
				'ol',
				'li', // Lists (unordered and ordered)
				'img',
				'table',
				'thead',
				'tbody',
				'tr',
				'td',
				'th', // Images & Tables
				'strong',
				'em',
				'u',
				's',
				'blockquote',
				'pre' // Formatting tags
			]),
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				a: ['href', 'name', 'target', 'rel'], // Links
				img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'], // Images
				table: ['border'] // Optional table attributes
			},
			allowedSchemes: ['http', 'https', 'mailto', 'ftp'], // Allow only safe URL schemes
			selfClosing: ['img', 'br', 'hr'], // Self-closing tags
			allowedSchemesAppliedToAttributes: ['href', 'src'], // Ensure only safe URLs in href and src
			allowProtocolRelative: true // Allow protocol-relative URLs (e.g., //example.com)
		});

		// Step 1: Remove empty paragraphs (with only <br> or whitespace/newlines)
		let cleanedHtml = sanitizedHtml.replace(/<p>(\s|<br\s*\/?>)*<\/p>/g, '');

		// Step 2: Remove <p> tags inside <li> and keep their inner content
		cleanedHtml = cleanedHtml.replace(/<li>\s*<p>(.*?)<\/p>\s*<\/li>/g, '<li>$1</li>');

		return cleanedHtml;
	};
	let html = $state('hideHtml');
	let editQuill = $state('showQuill');

	const toggleMode = () => {
		if (html === 'showHtml') {
			html = 'hideHtml';
			editQuill = 'showQuill';
			quill.root.innerHTML = pageState.contents;
		} else {
			html = 'showHtml';
			editQuill = 'hideQuill';
		}
	};

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

	let images = propsData.data.images.items;

	const updateMessage = (message = '') => {
		pageState.message = message;
	};

	let saveData = {};

	const savePost = () => {
		saveData = {
			title: pageState.title,
			slug: pageState.slug,
			contents: pageState.contents,
			excerpt: pageState.excerpt,
			featuredImage: pageState.featuredImageId
		};
		return saveData;
	};

	const updatePage = async () => {
		try {
			if (pageState.id) {
				await pb.collection('posts').update(pageState.id, savePost());
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

	const saveFeaturedImage = async (imageId) => {
		// pass this function into the Gallery Component
		pageState.featuredImageId = imageId;
		const image = await pb.collection('images').getOne(imageId, {});
		pageState.featuredImage = image;
		console.log('image saved', image);
		dialog.close();
	};

	let editor;

	onMount(() => {
		editor = new Editor({
			element: document.querySelector('#editor'),
			extensions: [StarterKit, Link.configure({ openOnClick: true }), Image],
			content: pageState.contents,
			onUpdate: ({ editor }) => {
				pageState.contents = cleanHtml(editor.getHTML());
			},
			editorProps: {
				attributes: {
					class: 'proseEditor'
				}
			}
		});

		return () => editor.destroy();
	});

	// Function to handle link insertion
	function addLink() {
		const url = prompt('Enter the link URL');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}
	$effect(() => {
		if (editor && editor.getHTML() !== pageState.contents) {
			editor.commands.setContent(pageState.contents);
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />
<div class="container page">
	<form
		class="form"
		onsubmit={(e) => {
			e.preventDefault();
			updatePage();
		}}
	>
		<input class="input h1" bind:value={pageState.title} placeholder="New Post Title" />

		<label for="quill-container">
			<span class="ql">Contents:</span>

			<div class={editQuill}>
				<div class="toolbar">
					<button onclick={() => editor.chain().focus().toggleBold().run()}
						><strong>B</strong></button
					>
					<button onclick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></button>

					<button onclick={() => editor.chain().focus().toggleBulletList().run()}
						>Bullet List</button
					>
					<button onclick={() => editor.chain().focus().toggleOrderedList().run()}
						>Ordered List</button
					>
					<button onclick={addLink}>Link</button>
				</div>
				<div id="editor"></div>
			</div>

			<textarea bind:value={pageState.contents} class="{html} container input"></textarea>
		</label>
		<button onclick={toggleMode}>html</button>

		<textarea class="input -m-y" bind:value={pageState.excerpt}> </textarea>

		{pageState.message}

		<button type="submit" class="btn save">Save Post</button>

		{#if pageState.featuredImage.id}
			<figure class="figure -m-y">
				<img
					src="{imagesq}/300/{pageState.featuredImage.id}/{pageState.featuredImage.image}"
					alt="big fat moma"
				/>
			</figure>
		{/if}

		<dialog class="dialog page" bind:this={dialog}>
			<button class="btn" onclick={closeModal}>Close</button>
			<Gallery gallery={images} SaveImageCallback={saveFeaturedImage} />
		</dialog>

		<button class="btn full" onclick={openModal}> Set Featured Image </button>
	</form>
</div>

<style>
	.showHtml {
		display: block;
		min-height: 400px;
	}

	.hideHtml {
		display: none;
	}

	.showQuill {
		display: block;
	}

	.hideQuill {
		position: absolute;
		left: -3000px;
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

	#editor {
		border: 1px solid #ccc;
		padding: 10px;
		min-height: 200px;
	}

	.toolbar {
		display: flex;
		gap: 8px;
		margin-bottom: 10px;
	}

	.toolbar button {
		padding: 5px 10px;
		border: 1px solid #ccc;
		background-color: #f9f9f9;
		cursor: pointer;
	}

	.toolbar button.active {
		background-color: #ddd;
		font-weight: bold;
	}

	.proseEditor {
		color: pink;
	}

	div.tiptap p {
		margin: 1em 0;
		color: red;
	}
</style>
