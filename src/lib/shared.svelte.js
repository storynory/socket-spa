const searchItems = {
    query: "",
    searchResults: [],
    allResults : [],
    page: 0,
    totalPages: 0,
    perPage : 10,
    totalItems : 0,
   
    
  };
  
  export const shared = $state({
    searchItems
  });
  