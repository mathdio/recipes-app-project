import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        id="search-input"
      />
      <label htmlFor="ingredient-search-radio">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
          name="filters"
          value="ingredient"
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-search-radio"
          name="filters"
          value="name"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search-radio"
          name="filters"
          value="first-letter"
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
