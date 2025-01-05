<script>
    import SearchIcon from '$lib/components/icons/searchIcon.svelte';
    import { shared } from '$lib/shared.svelte.js';
    import Fuse from 'fuse.js';
  
    let { posts } = $props(); // Assuming posts is an array of objects
    let query = $state(''); // Local query variable, no longer shared globally
  
    // Initialize Fuse.js with options
    const fuse = new Fuse(posts, {
      keys: ['title', 'excerpt'], // Specify the fields to search in posts
      threshold: 0.3, // Adjust the threshold for fuzzy matching
    });
  
    // Reactive effect: Perform search when query changes
    $effect(() => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        // @ts-ignore
        shared.searchItems.searchResults = fuse.search(trimmedQuery).map(result => result.item);
      } else {
        shared.searchItems.searchResults = posts; // Show all posts if query is empty
      }
    });
  </script>
  
  <div class="center container page-width -p-x-lg">
    <div class="search-form">
      <span class="search-icon"><SearchIcon /></span>
      <input
        bind:value={query}
        class="input search-input"
        type="text"
        name="q"
        placeholder="Search images"
        aria-label="Search"
      />
    </div>
  </div>
  
  <style>
    .search-form {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 500px;
      margin: auto;
    }
  
    .search-icon {
      position: absolute;
      left: 25px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      pointer-events: none;
      color: #aaa;
    }
  
    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      font-size: 1.25rem;
      border: 2px solid #ddd;
      border-radius: 50px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      outline: none;
      transition: all 0.3s ease-in-out;
    }
  
    .search-input:focus {
      border-color: #0078ff;
      box-shadow: 0 0 10px rgba(0, 120, 255, 0.5);
    }
  
    .search-input::placeholder {
      color: #aaa;
      font-style: italic;
    }
  </style>
  