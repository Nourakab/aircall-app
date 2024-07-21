// SearchBar.js
import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by phone number"
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
