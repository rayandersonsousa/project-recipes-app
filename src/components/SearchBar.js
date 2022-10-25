import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="searchOptions">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchOptions"
        />
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchOptions"
        />
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchOptions"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
