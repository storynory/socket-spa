<script>
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import { getContext } from 'svelte';
	import { sharedEditor } from './shared.svelte.js';

	import Typography from '@tiptap/extension-typography';
	import { FigureNode, FigcaptionNode } from '$lib/components/editors/figureNode';

	let { initialContent = '', onContentUpdate, images } = $props();

	// Get the context
	const { pageState, updatePageState } = getContext('pageState');
	let editor = $state();

	function updateContents(newContents) {
		updatePageState((state) => {
			state.contents = newContents; // Update the `contents`
			state.updated = new Date().toISOString(); // Automatically update timestamp
		});
	}

	let element = $state();

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'r'
				}
			},
			element: element,
			extensions: [
				StarterKit /*   
Blockquote
BulletList
CodeBlock
Document
HardBreak
Heading
HorizontalRule
ListItem
OrderedList
Paragraph
Text   */,
				Typography,
				FigureNode,
				FigcaptionNode,
				Link.configure({ openOnClick: true }),
				Image
			],

			content: initialContent,
			onUpdate: ({ editor }) => {
				const updatedContent = editor.getHTML();
				onContentUpdate?.(updatedContent); // Trigger the callback
			}
		});
		sharedEditor.editor = editor;
		return () => editor.destroy();
	});

	// Effect to sync external content changes with the editor
	$effect(() => {
		if (editor && editor.getHTML() !== initialContent) {
			editor.commands.setContent(initialContent);
		}
	});
</script>

<article class="container">
	<div id="editor" class="editor -p-lg" bind:this={element}></div>
</article>

<style>
</style>
