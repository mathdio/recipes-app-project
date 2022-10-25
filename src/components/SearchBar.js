import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { searchRecipe, setSearchRecipe, filterValue,
    setFilterValue } = useContext(Context);

  const handleFetchAPI = async () => {
    if (filterValue === 'ingredient') {
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchRecipe}`);
    } else if (filterValue === 'name') {
      await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipe}`);
    } else if (filterValue === 'first-letter') {
      if (searchRecipe.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchRecipe}`);
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        id="search-input"
        value={ searchRecipe }
        onChange={ ({ target }) => setSearchRecipe(target.value) }
      />
      <label htmlFor="ingredient-search-radio">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
          name="filters"
          value="ingredient"
          onChange={ ({ target }) => setFilterValue(target.value) }
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
          onChange={ ({ target }) => setFilterValue(target.value) }
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
          onChange={ ({ target }) => setFilterValue(target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleFetchAPI }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
