import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes({ title }) {
  const [favoriteRecipesArray, setFavoriteRecipesArray] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavoriteRecipesArray(favoriteRecipes);
    if (favoriteRecipes.length > 0) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [update]);

  const handleShare = (id, type) => {
    setLinkCopied(true);
    const { protocol, hostname, port } = window.location;
    copy(`${protocol}//${hostname}:${port}/${type}s/${id}`);
    // navigator.clipboard.writeText(`${protocol}//${hostname}:${port}/${type}s/${id}`);
  };

  const handleRemoveFavorite = (id) => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavoriteArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
    setUpdate(!update);
  };

  const filterFavorite = (type) => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    if (type) {
      const filteredFavorite = favoriteRecipes.filter((recipe) => recipe.type === type);
      setFavoriteRecipesArray(filteredFavorite);
    } else {
      setFavoriteRecipesArray(favoriteRecipes);
    }
  };

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      {showButtons && (
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterFavorite() }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => filterFavorite('meal') }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterFavorite('drink') }
          >
            Drinks
          </button>
        </div>
      )}
      {favoriteRecipesArray.map((recipe, index) => (
        <div key={ uuid() }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              className="favorite-card-img"
            />
          </Link>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
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
