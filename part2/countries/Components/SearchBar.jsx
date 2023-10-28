import React from "react";

const SearchBar = ({ searchCountry, handleChange }) => {
  return (
    <div>
      <p>Find countries</p>
      <input name="search" value={searchCountry} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
