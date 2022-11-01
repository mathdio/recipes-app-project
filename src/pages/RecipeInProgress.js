import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './RecipeDetails.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  fetchMeal, fetchDrink, fetchRecomendationsMeals,
  fetchRecomendationsDrinks,
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
  const [recomendations, setRecomendations] = useState([]);
  const [recomendKey, setRecomendKey] = useState([]);
  const [ready, setReady] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [done, setDone] = useState(false);
  const [ingredientsChecked, setIngredientesChecked] = useState([]);

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
    if (pathname.includes('/meals')) {
      fetchRecomendationsDrinks({ setRecomendations, setRecomendKey });
    } else if (pathname.includes('/drinks')) {
      fetchRecomendationsMeals({ setRecomendations, setRecomendKey });
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

  // const style = {
  //   textDecoration: 'line-through solid rgb(0, 0, 0)',
  // };

  const handleChecked = (ingredient) => {
    setIngredientesChecked((prevState) => (
      [...prevState, ingredient]
    ));
  };

  const removeChecked = (ingredient) => {
    const check = ingredientsChecked.some((e) => e === ingredient[1]);
    return check;
  };

  console.log(ingredientsChecked);
  return (
    <div>
      {ready && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ food[foodKeys[1]] }
            alt={ food[foodKeys[0]] }
          />
          <h1 data-testid="recipe-title">
            {food[foodKeys[0]]}
          </h1>
          {foodKeys[0] === 'strDrink' ? (
            <p data-testid="recipe-category">
              Drink:
              {' '}
              {food.strAlcoholic}
            </p>
          ) : (
            <p data-testid="recipe-category">
              Category:
              {' '}
              {food[foodKeys[2]]}
            </p>)}
          <ul>
            Ingredients:
            {' '}
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
                  onClick={ () => handleChecked(ingredient) }
                />
                {ingredient[1]}
                {' '}
                {measuresArray[index] && measuresArray[index][1]}
              </label>))}
          </ul>
          <p data-testid="instructions">
            {food[foodKeys[3]]}
          </p>
          {foodKeys[0] === 'strMeal' && (
            <iframe
              data-testid="video"
              title={ food[foodKeys[0]] }
              src={ food[foodKeys[4]] }
            />)}
          <div className="recomendations-scroll">
            <p>Recomendations:</p>
            {' '}
            {recomendations.map((recomendation, index) => (
              <div
                key={ uuid() }
                data-testid={ `${index}-recommendation-card` }
                className="recomendation-card"
              >
                <p data-testid={ `${index}-recommendation-title` }>
                  {recomendation[recomendKey]}
                </p>
              </div>))}
          </div>
          {!done && (
            <Link to={ `${pathname}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
              >
                {inProgress ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            </Link>)}
          <input
            type="image"
            alt=""
            data-testid="share-btn"
            src={ shareIcon }
            onClick={ handleShare }
          />
          <input
            type="image"
            alt=""
            src={ favorited ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
            onClick={ handleFavorite }
          />
          {linkCopied && <h3>Link copied!</h3>}
        </div>)}
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.any,
}.isRequired;
export default RecipeInProgress;
