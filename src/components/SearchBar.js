import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { searchRecipe, setSearchRecipe, filterValue,
    setFilterValue, setResultsData, resultKey, setResultKey } = useContext(Context);

  const [prefixEndpoint, setPrefixEndpoint] = useState('');
  const [foodAPI, setFoodAPI] = useState('');

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/meals') {
      setFoodAPI('themealdb');
      setResultKey(['meals', 'idMeal', 'Meal']);
    } else if (pathname === '/drinks') {
      setFoodAPI('thecocktaildb');
      setResultKey(['drinks', 'idDrink', 'Drink']);
    }
  }, []);

  useEffect(() => {
    if (filterValue === 'ingredient') {
      setPrefixEndpoint(`https://www.${foodAPI}.com/api/json/v1/1/filter.php?i=`);
    } else if (filterValue === 'name') {
      setPrefixEndpoint(`https://www.${foodAPI}.com/api/json/v1/1/search.php?s=`);
    } else if (filterValue === 'first-letter') {
      setPrefixEndpoint(`https://www.${foodAPI}.com/api/json/v1/1/search.php?f=`);
    }
  }, [filterValue, foodAPI]);

  const handleFetchAPI = async () => {
    if (filterValue === 'first-letter' && searchRecipe.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const resolve = await fetch(`${prefixEndpoint}${searchRecipe}`);
      const data = await resolve.json();
      if (data[resultKey[0]] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setResultsData(data[resultKey[0]]);
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
