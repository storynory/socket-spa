<script>
	import { sharedEditor } from './shared.svelte.js';
	import { getContext } from 'svelte';
	import Gallery from '$lib/components/gallery.svelte';
	import { imageresize, imagesq } from '$lib/images.js';

	const { images } = getContext('pageState'); // Retrieve from 'pageState'
	let cursorPosition = $state(null);

	/****************** toolbar section ****************************/

	let bold = () => {
		sharedEditor.editor?.chain().focus().toggleBold().run();
	};

	let italic = () => {
		sharedEditor.editor?.chain().focus().toggleItalic().run();
	};

	let toggleBulletList = () => {
		sharedEditor.editor?.chain().focus().toggleBulletList().run();
	};

	let toggleOrderedList = () => {
		sharedEditor.editor?.chain().focus().toggleOrderedList().run();
	};

	let toggleHeading = (level) => {
		sharedEditor.editor?.chain().focus().toggleHeading({ level }).run();
	};

	// Function to insert the selected image into the editor
	function insertFigure(image) {
		sharedEditor.editor
			.chain()
			.focus(cursorPosition)
			.insertContent([
				{
					type: 'figure',
					content: [
						{
							type: 'image',
							attrs: {
								src: `${imageresize}/600/${image.id}/${image.image}`,
								alt: image.alt
							}
						},
						{
							type: 'figcaption',
							content: [{ type: 'text', text: image.alt || 'Caption goes here' }] // Optional caption
						}
					]
				}
			])
			.run();
	}
	/****************** Modal / dialog ****************************/

	let dialog;
	let isDialogOpen = $state('closed');

	const openModal = () => {
		isDialogOpen = 'open';
		cursorPosition = sharedEditor.editor.state.selection.from; // store cursor position for correct insertion
		dialog.showModal();
	};
	const closeModal = () => {
		dialog.close();
		isDialogOpen = 'closed';
		console.log(isDialogOpen);
	};

	// Function to handle image selection based on mode
	function handleImageSelect(image) {
		// Insert image into the editor
		insertFigure(image);

		closeModal(); // Close the modal after the action
	}
</script>

<div class="toolbar" role="toolbar" aria-label="Text formatting toolbar">
	<button aria-label="Bold" onclick={bold}> B </button>
	<button aria-label="Italic" onclick={italic}> I </button>

	<button aria-label="Bullet list" onclick={toggleBulletList}> UL </button>

	<button aria-label="Ordered list" onclick={toggleOrderedList}> OL </button>

	<button aria-label="Heading level 1" onclick={() => toggleHeading(1)}> H1 </button>

	<button aria-label="Heading level 2" onclick={() => toggleHeading(2)}> H2 </button>

	<button aria-label="Heading level 3" onclick={() => toggleHeading(3)}> H3 </button>
	<button aria-label="Insert image" onclick={openModal}>Img</button>
</div>
<!-- Modal for Image Selection -->
<dialog class="dialog page {isDialogOpen}" bind:this={dialog}>
	<button class="btn" onclick={closeModal}>Close</button>
	<Gallery gallery={images} onImageSelect={handleImageSelect} />
</dialog>

<style>
	/* Style for the toolbar */
	.toolbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		border-top: 1px solid #ddd;
		padding: 10px 20px;
		z-index: 1000;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}

	.toolbar button {
		padding: 10px 15px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.toolbar button:hover {
		background-color: #0056b3;
	}
	/*   Open state of the dialog  */
	dialog[open] {
		opacity: 1;
		transform: scaleY(1);
	}

	/*   Closed state of the dialog   */
	dialog {
		width: 100%;
		height: 100vh;
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
