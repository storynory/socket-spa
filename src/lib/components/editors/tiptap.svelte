<script>
  import { onMount } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';

  let { content = '<p>Start writing here...</p>' } = $props(); // Destructure props with default content
  let editor;

  // Initialize the editor on mount
  onMount(() => {
    editor = new Editor({
      element: document.querySelector('#editor'),
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: true }),
        Image,
      ],
      content,
      onUpdate: ({ editor }) => {
        content = editor.getHTML(); // Update content on change
      },
    });

    return () => editor.destroy(); // Clean up on unmount
  });
</script>

<!-- Toolbar -->
<div class="toolbar">
  <button onclick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
  <button onclick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
  <button onclick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
  <button onclick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</button>
</div>

<!-- Editor Container -->
<div id="editor" class="ProseMirror"></div>

<style>
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

  .toolbar button:hover {
    background-color: #eee;
  }

  .toolbar button:active {
    background-color: #ddd;
  }

  .ProseMirror {
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 200px;
    outline: none;
    transition: border-color 0.2s ease-in-out;
  }

  .ProseMirror:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
</style>
