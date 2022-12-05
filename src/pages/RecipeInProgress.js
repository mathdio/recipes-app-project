import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './RecipeDetails.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import blackFilter from '../images/black-filter.jpg';
import {
  fetchMeal, fetchDrink,
} from '../services/fetchFunctions';
import './RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipeInProgress({ match }) {
  const { params: { id } } = match;
  const { pathname } = useLocation();
  const [food, setFood] = useState();
  const [foodKeys, setFoodKeys] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [measuresArray, setMeasuresArray] = useState([]);
  const [ready, setReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      alert('Link copied!');
      setLinkCopied(false);
    }
  }, [linkCopied]);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      fetchMeal({
        id,
        setFood,
        setIngredientsArray,
        setMeasuresArray,
        setFoodKeys,
        setReady,
      });
    } else if (pathname.includes('/drinks')) {
      fetchDrink({
        id,
        setFood,
        setIngredientsArray,
        setMeasuresArray,
        setFoodKeys,
        setReady,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
    if (pathname.includes('/meals')) {
      const keysInProgress = Object.keys(inProgressRecipes.meals);
      if (keysInProgress.some((idInProgress) => idInProgress === id)) {
        setInProgress(true);
      }
    } else {
      const keysInProgress = Object.keys(inProgressRecipes.drinks);
      if (keysInProgress.some((idInProgress) => idInProgress === id)) {
        setInProgress(true);
      }
    }
  }, []);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    const isDone = doneRecipes.some((recipe) => recipe.id === id);
    if (isDone) {
      setDone(true);
    }
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isFavorited = favoriteRecipes.some((recipe) => recipe.id === id);
    if (isFavorited) {
      setFavorited(true);
    }
  }, []);

  // const handleCheckbox = (index) => {
  //   const inProgressRecipes = localStorage.getItem('inProgressRecipes')
  //     ? JSON.parse(localStorage.getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
  //   if (Object.keys(inProgressRecipes).some((idRecipe) => idRecipe === id)) {

  //   }
  // };

  const handleShare = () => {
    setLinkCopied(true);
    copy(`${window.location.href}`);
  };

  const handleFavorite = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isFavorited = favoriteRecipes.some((recipe) => recipe.id === id);
    if (isFavorited) {
      const newFavoriteArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteArray));
      setFavorited(false);
    } else {
      const newFavorite = {
        id,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: pathname.includes('/meals') ? food.strArea : '',
        category: food.strCategory,
        alcoholicOrNot: pathname.includes('/drinks') ? food.strAlcoholic : '',
        name: food[foodKeys[0]],
        image: food[foodKeys[1]],
      };
      favoriteRecipes.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavorited(true);
    }
  };

  return (
    <main className="RecipeInProgress__main-container">
      {ready && (
        <div className="RecipeInProgress__recipe-container">
          <div className="RecipeInProgress__img-container">
            <img src={ blackFilter } alt="" className="RecipeInProgress__black-filter" />
            <div className="RecipeInProgress__title-container">
              <p data-testid="recipe-title" className="">
                {food[foodKeys[0]]}
              </p>
            </div>
            {foodKeys[0] === 'strDrink' ? (
              <p
                data-testid="recipe-category"
                RecipeInProgress__recipe-category
              >
                Drink:
                {' '}
                {food.strAlcoholic}
              </p>
            ) : (
              <p
                data-testid="recipe-category"
                className="RecipeInProgress__recipe-category"
              >
                Category:
                {' '}
                {food[foodKeys[2]]}
              </p>)}
            <div className="RecipeInProgress__icons-container">
              <input
                type="image"
                alt=""
                data-testid="share-btn"
                src={ shareIcon }
                onClick={ handleShare }
                className="RecipeInProgress__icons"
              />
              <input
                type="image"
                alt=""
                src={ favorited ? blackHeartIcon : whiteHeartIcon }
                data-testid="favorite-btn"
                onClick={ handleFavorite }
                className="RecipeInProgress__icons"
              />
            </div>
            <img
              data-testid="recipe-photo"
              src={ food[foodKeys[1]] }
              alt={ food[foodKeys[0]] }
              className="RecipeInProgress__recipe-details-img"
            />
          </div>
          <h1 className="RecipeInProgress__ingredients-title">Ingredients</h1>
          <ul className="RecipeInProgress__ingredients-container">
            {ingredientsArray.map((ingredient, index) => (
              <label
                key={ index }
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ index }
                  key={ uuid() }
                  className="RecipeInProgress__ingredient-checkbox"
                  onChange={ () => handleCheckbox(index) }
                />
                {ingredient[1]}
                {' '}
                {measuresArray[index] && measuresArray[index][1]}
              </label>))}
          </ul>
          <h1 className="RecipeInProgress__instructions-title">Instructions</h1>
          <p
            data-testid="instructions"
            className="RecipeInProgress__instructions-container"
          >
            {food[foodKeys[3]]}
          </p>
          {foodKeys[0] === 'strMeal' && (
            <iframe
              data-testid="video"
              title={ food[foodKeys[0]] }
              src={ food[foodKeys[4]] }
            />)}
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="RecipeInProgress__finish-button"
          >
            FINISH RECIPE
          </button>
        </div>)}
    </main>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.any,
}.isRequired;
export default RecipeInProgress;
