import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import blackFilter from '../images/black-filter.jpg';
import {
  fetchMeal, fetchDrink,
} from '../services/fetchFunctions';
import handleCheckbox from '../services/handleCheckbox';
import './RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipeInProgress({ match, history }) {
  const { params: { id } } = match;
  const { pathname } = useLocation();
  const [food, setFood] = useState();
  const [foodKeys, setFoodKeys] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [measuresArray, setMeasuresArray] = useState([]);
  const [ready, setReady] = useState(false);
  const [inProgress, setInProgress] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [finishDisabled, setFinishDisabled] = useState(true);

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
    const apiType = pathname.includes('/meals') ? 'meals' : 'drinks';
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage
        .getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const keysInProgress = Object.keys(inProgressRecipes[apiType]);
    if (keysInProgress.some((idInProgress) => idInProgress === id)) {
      setInProgress(inProgressRecipes[apiType][id]);
    }
    if (inProgress.length === ingredientsArray.length) {
      setFinishDisabled(false);
    }
  }, []);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const isFavorited = favoriteRecipes.some((recipe) => recipe.id === id);
    if (isFavorited) {
      setFavorited(true);
    }
  }, []);

  const finishRecipe = () => {
    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const apiType = pathname.includes('/meals') ? 'meals' : 'drinks';
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes[apiType].some((recipe) => recipe.id === id)) {
      const newDone = {
        id,
        type: apiType.split('').slice(0, apiType.length - 1).join(''),
        nationality: food.strArea ? food.strArea : '',
        category: food.strCategory ? food.strCategory : '',
        alcoholicOrNot: food.strAlcoholic ? food.strAlcoholic : '',
        name: food.strMeal ? food.strMeal : food.strDrink,
        image: food.strMealThumb ? food.strMealThumb : food.strDrinkThumb,
        doneDate: currentDate,
        tags: food.strTags ? food.strTags.split(',') : [],
      };
      doneRecipes[apiType].push(newDone);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
    history.push('/done-recipes');
  };

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
                className="RecipeInProgress__recipe-category"
              >
                {food.strAlcoholic}
              </p>
            ) : (
              <p
                data-testid="recipe-category"
                className="RecipeInProgress__recipe-category"
              >
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
                  defaultChecked={ inProgress.some((ingIndex) => ingIndex === index) }
                  onChange={ (event) => handleCheckbox(
                    event,
                    index,
                    id,
                    { pathname,
                      setInProgress,
                      boxesAmount: foodKeys[5],
                      setFinishDisabled },
                  ) }
                />
                {ingredient[1]}
                {' '}
                {measuresArray[index] && measuresArray[index][1]}
              </label>
            ))}
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
            onClick={ () => finishRecipe() }
            disabled={ finishDisabled }
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
