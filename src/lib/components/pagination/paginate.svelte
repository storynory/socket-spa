<script>
    // @ts-nocheck
    let { pageSwitch,getData } = $props();
    let  data = getData()

   
    let totalPages = $state(data.totalPages ); // total number of pages
    let currentPage = $state(data.pageN)
 
//https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
 function pagination2(current, total) {
    const center = [current - 2, current - 1, current, current + 1, current + 2],
        filteredCenter = center.filter((p) => p > 1 && p < total),
        includeThreeLeft = current === 5,
        includeThreeRight = current === total - 4,
        includeLeftDots = current > 5,
        includeRightDots = current < total - 4;

    if (includeThreeLeft) filteredCenter.unshift(2)
    if (includeThreeRight) filteredCenter.push(total - 1)

    if (includeLeftDots) filteredCenter.unshift('...');
    if (includeRightDots) filteredCenter.push('...');

    return [1, ...filteredCenter, total]
}

    
    
    function handlePageSwich(newPage) {
      if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage; // update currentPage reactively
        pageSwitch(newPage); // call external function with new page
      }
    }
    
    function fetchImgs(page) {
      currentPage = page; // update currentPage reactively
      pageSwitch(page); // call external function to fetch images for the page
    }
    </script>
    
    <div class="pagination">
      {#if currentPage > 1}
        <button
          class="pagination__btn pagination__btn--prev"
          aria-label="Previous page"
          onclick={() => handlePageSwich(currentPage - 1)}
        >
          &laquo; Previous
        </button>
      {/if}
    
      <ul class="pagination__list">
        {#each pagination2(currentPage, totalPages) as page}
          <li class="pagination__item">
            {#if page === '...'}
              <span class="pagination__ellipsis">...</span>
            {:else}
              <button
                class="pagination__link"
                aria-current={currentPage === page ? 'true' : null}
                aria-label="Page {page}"
                onclick={() => fetchImgs(page)}
              >
                {page}
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    
      {#if currentPage < totalPages}
        <button
          class="pagination__btn pagination__btn--next"
          aria-label="Next page"
          onclick={() => handlePageSwich(currentPage + 1)}
        >
          Next &raquo;
        </button>
      {/if}
    </div>
    
    <style>
      .pagination {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        font-family: Arial, sans-serif;
      }
    
      .pagination__btn {
        padding: 8px 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }
    
      .pagination__btn:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    
      .pagination__btn:hover:not(:disabled) {
        background-color: #0056b3;
      }
    
      .pagination__list {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 4px;
      }
    
      .pagination__link {
        padding: 8px 12px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s, border-color 0.3s;
      }
    
      .pagination__link:hover {
        background-color: #e2e6ea;
        border-color: #d6d8db;
      }
    
      .pagination__link[aria-current="true"] {
        background-color: #007bff;
        color: white;
        font-weight: bold;
        cursor: default;
        border-color: #0056b3;
      }
    
      .pagination__ellipsis {
        padding: 8px 12px;
        font-size: 14px;
        color: #6c757d;
        cursor: default;
      }
    </style>
    