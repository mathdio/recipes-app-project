import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes({ title }) {
  const [favoriteRecipesArray, setFavoriteRecipesArray] = useState([]);
  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavoriteRecipesArray(favoriteRecipes);
  }, []);

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipesArray.map((recipe, index) => (
        <div key={ uuid() }>
          <img
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <input
            type="image"
            alt=""
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
          <input
            type="image"
            alt=""
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </div>
      ))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FavoriteRecipes;
