import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes({ title }) {
  // const history = useHistory();
  const [done, setDone] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      alert('Link copied!');
      setLinkCopied(false);
    }
  }, [linkCopied]);

  const handleShare = (recipeType, recipeId) => {
    setLinkCopied(true);
    copy(`${window.location.host}/${recipeType}s/${recipeId}`);
  };

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : { meals: [], drinks: [] };

    const concatDone = doneRecipes.drinks.concat(doneRecipes.meals);
    setDone(concatDone);
  }, []);

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      <main className="DoneRecipes__main-container">
        <div className="DoneRecipes__filter-btn-container">
          <button
            className="DoneRecipes__filter-button"
            onClick={ () => filterDoneRecipes('') }
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            className="DoneRecipes__filter-button"
            onClick={ () => filterDoneRecipes('meal') }
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </button>
          <button
            className="DoneRecipes__filter-button"
            onClick={ () => filterDoneRecipes('drink') }
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div className="DoneRecipes__done-recipes-container">
          {done.map((recipe, index) => (
            <div key={ uuid() } className="DoneRecipes__card-recipe">
              <img
                className="DoneRecipes__img-recipe"
                alt={ recipe.name }
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
              />
              <div className="DoneRecipes__info-recipe">
                <p
                  data-testid={ `${index}-horizontal-name` }
                  className="DoneRecipes__name-recipe"
                >
                  {recipe.name}
                </p>
                {recipe.type === 'meal'
                  ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="DoneRecipes__category-recipe"
                    >
                      {recipe.nationality}
                      {' '}
                      •
                      {' '}
                      {recipe.category}
                    </p>)
                  : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="DoneRecipes__category-recipe"
                    >
                      {recipe.alcoholicOrNot}
                    </p>) }
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="DoneRecipes__date-recipe"
                >
                  Done in:
                  {' '}
                  {recipe.doneDate}
                </p>
                <div className="DoneRecipes__tags-container">
                  {recipe.tags.map((tag, tagIndex) => tagIndex < 2 && (
                    <p
                      key={ uuid() }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      className="DoneRecipes__tag-recipe"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <input
                type="image"
                alt=""
                src={ shareIcon }
                className="DoneRecipes__share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleShare(recipe.type, recipe.id) }
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DoneRecipes;
