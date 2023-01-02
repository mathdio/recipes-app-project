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
  const [noFavorites, setNoFavorites] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      alert('Link copied!');
      setLinkCopied(false);
    }
  }, [linkCopied]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setFavoriteRecipesArray(favoriteRecipes);
    if (favoriteRecipes.length < 1) {
      setNoFavorites(true);
    } else {
      setNoFavorites(false);
    }
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
      <div className="FavoriteRecipes__main-container">
        <div className="FavoriteRecipes__filter-btn-container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterFavorite() }
            className="FavoriteRecipes__filter-button"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => filterFavorite('meal') }
            className="FavoriteRecipes__filter-button"
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterFavorite('drink') }
            className="FavoriteRecipes__filter-button"
          >
            Drinks
          </button>
        </div>
        {noFavorites
          ? (
            <h1 className="FavoriteRecipes__empty-warning">
              Your favourites list is empty
            </h1>)
          : (
            <div className="FavoriteRecipes__favorite-recipes-container">
              {favoriteRecipesArray.map((recipe, index) => (
                <div key={ uuid() } className="FavoriteRecipes__card-recipe">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      alt={ recipe.name }
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      className="FavoriteRecipes__img-recipe"
                    />
                  </Link>
                  <div className="FavoriteRecipes__info-recipe">
                    <div className="FavoriteRecipes__text-container">
                      <Link
                        to={ `/${recipe.type}s/${recipe.id}` }
                        className="FavoriteRecipes__name-link"
                      >
                        <p
                          data-testid={ `${index}-horizontal-name` }
                          className="FavoriteRecipes__name-recipe"
                        >
                          {recipe.name}
                        </p>
                      </Link>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                        className="FavoriteRecipes__category-recipe"
                      >
                        {recipe.type === 'meal'
                          ? `${recipe.nationality} • ${recipe.category}`
                          : `${recipe.alcoholicOrNot}`}
                      </p>
                    </div>
                    <div className="FavoriteRecipes__icons-container">
                      <input
                        type="image"
                        alt=""
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        onClick={ () => handleShare(recipe.id, recipe.type) }
                        className="FavoriteRecipes__icon"
                      />
                      <input
                        type="image"
                        alt=""
                        src={ blackHeartIcon }
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        onClick={ () => handleRemoveFavorite(recipe.id) }
                        className="FavoriteRecipes__icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FavoriteRecipes;
