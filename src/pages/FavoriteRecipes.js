import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes({ title }) {
  const [favoriteRecipesArray, setFavoriteRecipesArray] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavoriteRecipesArray(favoriteRecipes);
  }, [update]);

  const handleShare = (id, type) => {
    setLinkCopied(true);
    const { protocol, hostname, port } = window.location;
    copy(`${protocol}//${hostname}:${port}/${type}s/${id}`);
  };

  const handleRemoveFavorite = (id) => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavoriteArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
    setUpdate(!update);
  };

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
            onClick={ () => handleShare(recipe.id, recipe.type) }
          />
          <input
            type="image"
            alt=""
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleRemoveFavorite(recipe.id) }
          />
          {linkCopied && <p>Link copied!</p>}
        </div>
      ))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FavoriteRecipes;
