<script>
	// Import dependencies
	import { imageresize, imagesq } from '$lib/images.js';
	import { pb } from '$lib/pocketbase.svelte.js';
	import { tick } from 'svelte';

	// Destructure props
	let { gallery: initialGallery, onImageSelect } = $props();

	// Reactive states
	let gallery = $state([...initialGallery]); // Initial gallery of images
	let uploading = $state(false); // Uploading state
	let imageState = $state({ edit: false, id: '' }); // State for editing an image

	// File selection state
	let selectedFile = null;

	// Constants
	const MAX_FILE_SIZE = 1 * 1024 * 1024; // Maximum file size: 1MB
	const VALID_FILE_TYPES = [
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp',
		'image/svg+xml',
		'image/avif',
		'image/apng'
	];

	/**
	 * Handle the selection of an image from the gallery.
	 * @param {Object} image - The selected image object.
	 */
	function selectGalleryImage(image) {
		onImageSelect(image); // Trigger the callback with the selected image
	}

	/**
	 * Handle file input selection.
	 * Validates file type and size.
	 * @param {Event} event - The input change event.
	 */
	function handleFileSelection(event) {
		const file = event.target.files[0];

		// Check for valid file type
		if (file && !VALID_FILE_TYPES.includes(file.type)) {
			alert('Invalid file type. Please upload a supported image format.');
			return;
		}

		// Check for valid file size
		if (file && file.size > MAX_FILE_SIZE) {
			alert('File size exceeds the limit of 1MB. Please upload a smaller file.');
			return;
		}

		selectedFile = file;
	}

	/**
	 * Upload the selected file to PocketBase.
	 */
	async function uploadSelectedFile() {
		if (!selectedFile) {
			alert('No file selected. Please choose a file to upload.');
			return;
		}

		// Prepare form data for upload
		const formData = new FormData();
		formData.append('image', selectedFile);
		formData.append('title', selectedFile.name);
		formData.append('alt', 'Uploaded image');

		try {
			const uploadedImage = await pb.collection('images').create(formData);
			gallery = [uploadedImage, ...gallery]; // Add uploaded image to the gallery
			selectedFile = null; // Reset the file selection
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Failed to upload the file. Please try again.');
		}
	}

	/**
	 * Fetch an image record by its ID.
	 * @param {string} imageId - The ID of the image to fetch.
	 * @returns {Object|null} The fetched image record or null if an error occurred.
	 */
	async function fetchImage(imageId) {
		try {
			let image = await pb.collection('images').getOne(imageId);
			saveData.title = image.title || 'new title';
			saveData.alt = image.alt || 'new alt';
			saveData.caption = image.caption || 'new caption';
			return image;
		} catch (error) {
			console.error('Error fetching image:', error);
			return null;
		}
	}

	/**
	 * Update the state for editing an image.
	 * @param {string} id - The ID of the image to edit.
	 */
	function enterEditMode(id) {
		imageState.id = id;
		imageState.edit = true;
	}

	// update this when somebody clicks "edit image" and then use as save data
	let saveData = $state({
		title: 'initial image Title',
		alt: 'initial alt',
		caption: 'new caption'
	});

	const updateImage = async () => {
		try {
			if (imageState.id) {
				await pb.collection('images').update(imageState.id, saveData);
				console.log('update');

				// updateMessage('image Updated');
			} else {
				const createdImage = await pb.collection('images').create(saveData);
				imageState.id = createdImage.id;
				//updateMessage('Post Created');
			}
		} catch (error) {
			console.error('Failed to save image.', error);
			//updateMessage('Image Failed to Save', error);
		}
	};
</script>

<!-- Snippet for displaying the gallery -->
{#snippet gallerySnippet(images)}
	{#each images as image}
		<figure>
			<header class="center"></header>

			<img src="{imagesq}/300/{image.id}/{image.image}" alt={image.alt} />
			<span class="tooltip-text">Click to Select</span>

			<footer>
				<button
					class="btn"
					type="button"
					aria-label="Select image: {image.title}"
					onclick={() => selectGalleryImage(image)}
				>
					Select
				</button>
				<button
					class="btn"
					onclick={() => {
						enterEditMode(image.id);
					}}
				>
					Details
				</button>
			</footer>
		</figure>
	{/each}
{/snippet}

<!-- Snippet for editing an image -->
{#snippet editImageSnippet(imageId)}
	{#await fetchImage(imageState.id) then image}
		{#if image}
			<button
				class="back-button btn"
				onclick={() => {
					imageState.edit = false;
				}}
			>
				&larr; Back
			</button>
			<header class="center">
				<label class=" container -m">
					Image Title
					<textarea
						class="input h1"
						id="imgTitle"
						bind:value={saveData.title}
						placeholder="New Image Title"
						aria-label="Image Title"
					></textarea>
				</label>
			</header>
			<figure>
				<img src="{imageresize}/600/{image.id}/{image.image}" alt={image.alt} />
			</figure>
			<label class="container info">
				Image Caption
				<textarea
					id="imgCaption"
					class="input -m"
					bind:value={saveData.caption}
					placeholder="New caption text"
					aria-label="Image Caption Text"
				></textarea>
			</label>
			<div class="-p">
				<label class="container">
					Image Alt
					<input
						id="imgAlt"
						class="input"
						bind:value={saveData.alt}
						placeholder="New Alt"
						aria-label="Image Alt"
					/>
				</label>
			</div>
			<div class="-p">
				<label class="container">
					Image Credit
					<input
						id="imgCredit"
						class="input"
						value="image credit"
						placeholder="New Image Credit"
						aria-label="Image Credit Text"
					/>
				</label>
				<button class="btn full" onclick={updateImage}>Save Image</button>
			</div>

			<h2>Alternative Sizes</h2>
			<h3>300 Square</h3>
			<img src="{imagesq}/300/{image.id}/{image.image}" alt={image.alt} />
			<h3>300 Landscape</h3>
			<img src="{imageresize}/300/{image.id}/{image.image}" alt={image.alt} />
			<div class="p">
				File Name: {image.image}
			</div>
		{:else}
			<p>Image not found.</p>
		{/if}
	{:catch error}
		<p>Error loading image: {error.message}</p>
	{/await}
{/snippet}

<!-- Main Layout -->
{#if !imageState.edit}
	<!-- Upload Section -->
	<div class="upload-section">
		<input type="file" class="input fileupload" accept="image/*" onchange={handleFileSelection} />
		<button class="btn" onclick={uploadSelectedFile}> Upload </button>
	</div>
	<div class="gallery container">
		{@render gallerySnippet(gallery)}
	</div>
{:else}
	<div class="container page-width editImage">
		{@render editImageSnippet(imageState.id)}
	</div>
{/if}

<style>
	.fileupload {
		max-width: 400px;
	}
	/* file upload button */
	input[type='file']::file-selector-button {
		transition: background-color 200ms;
		border-radius: 4px;
		padding: 0 16px;
		height: 40px;
		cursor: pointer;
		background-color: white;
		border: 1px solid rgba(0, 0, 0, 0.16);
		box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
		margin-right: 16px;
	}

	/* file upload button hover state */
	input[type='file']::file-selector-button:hover {
		background-color: #f3f4f6;
	}

	/* file upload button active state */
	input[type='file']::file-selector-button:active {
		background-color: #e5e7eb;
	}
	.textarea {
		width: 100%;
	}

	.info {
		max-width: 600px;
		text-align: center;
	}

	.editImage {
		width: 100%;
		max-width: 800px;
		margin: auto;
	}

	.tooltip-text {
		display: none;
	}
	.image-button {
		position: relative;
	}
	.image-button:hover .tooltip-text {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-width: 1px;
		background-color: white;
		color: blue;
	}
</style>
