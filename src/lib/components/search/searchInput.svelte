<script>
    // @ts-nocheck
       // look at not holding original results in memory twice
    // I think I am using too much memory
    // as well as busting my brain
    // I think it's better not to paginate search results
    // but just show images for first 6 or so and then links
    
    let { updatePostsData, perPage, totalPages } = $props(); // Destructure props
    let query = $state(""); // Reactive state for query
    let fuseItems = $state([]); // Holds all posts for Fuse.js
    let results = $state([]); // Holds search results
    let allPosts = [] // Holds all original posts (too much memory?)
    let isSearch = $state(false)
    /**
     * @type {Fuse<any>}
     */
    let fuse;
    
    import PocketBase from 'pocketbase';
    import SearchIcon from '$lib/components/icons/searchIcon.svelte';
    import Fuse from 'fuse.js';
    import { onMount } from 'svelte';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    
    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    
    onMount(async () => {
      try {
        // Fetch all posts once
        allPosts = await pb.collection('posts').getFullList({
            sort: '-created',
            expand: 'featuredImage',
        });
      console.log(allPosts)
        // Prepare data for Fuse.js
        fuseItems = allPosts.map(post => ({
          title: post.title,
          excerpt: post.excerpt,
        }));
    
  
        // Initialise Fuse.js
 // Initialise Fuse.js
        fuse = new Fuse(fuseItems, {
        keys: [
            { name: 'title', weight: 0.7 },
            { name: 'excerpt', weight: 0.3 }
        ],
        threshold: 0.4,   // Controls how closely the match must meet the query
        distance: 700    // Increases tolerance for word position in the string
        });
            } catch (error) {
        console.error("Error initializing posts:", error);
      }
    });
    
    const performSearch = () => {
      if (!fuse) return;
    
      if (query.trim() === '') {
        updatePostsData({
            isSearch : false,     
        })
 
       
      } else {
        // Perform search using Fuse.js
        let searchResults = fuse.search(query).map(result => result.item);
        if (searchResults.length === 0) {
          results = [];
        } else {
          results = searchResults;
        }
      
        // Call updatePostsData with search results
 
        updatePostsData({
            pageN : 1,
            isSearch : true,
            searchPage: results
        }        
        );
      }
    };
    
    // Debounced search function
    function debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }
    
    const debouncedSearch = debounce(performSearch, 200);
</script>
    
    
    <div class="container page-width -p-x-lg">
      <div class="">
        <span class="search-icon"><SearchIcon /></span>
        <input
          bind:value={query}
          class="input search-input"
          type="text"
          name="q"
          placeholder="Search"
          aria-label="Search"
          oninput={debouncedSearch}
        />
      </div>
    </div>
    
    <style>
      .search-form {
        position: relative;
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
    