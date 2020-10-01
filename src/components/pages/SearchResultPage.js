import React from "react";
import SearchFilters from "../search-result-components/SearchFilters";
import SearchField from "../general-components/SearchField";

const SearchResultPage = () => {
  return (
    <div>  
    <h1 style={{ textAlign:'center'}}> 
    Query Results: </h1>
    <SearchFilters />
    </div>
  );
};

export default SearchResultPage;
