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
import { fetchMeal, fetchDrink, fetchRecomendationsMeals,
  fetchRecomendationsDrinks } from '../services/fetchFunctions';

const copy = require('clipboard-copy');

function RecipeDetails({ match }) {
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
        setReady });
    } else if (pathname.includes('/drinks')) {
      fetchDrink({
        id,
        setFood,
        setIngredientsArray,
        setMeasuresArray,
        setFoodKeys,
        setReady });
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
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const apiType = pathname.includes('/meals') ? 'meals' : 'drinks';

      if (inProgressRecipes[apiType][id] && inProgressRecipes[apiType][id].length > 0) {
        setInProgress(true);
      } else {
        setInProgress(false);
      }
    }
  }, []);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : { meals: [], drinks: [] };
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
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
    // navigator.clipboard.writeText(`${window.location.href}`);
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
    <main className="RecipeDetails__main-container">
      {ready && (
        <div className="RecipeDetails__recipe-container">
          <div className="RecipeDetails__img-container">
            <img src={ blackFilter } alt="" className="RecipeDetails__black-filter" />
            <div className="RecipeDetails__title-container">
              <p data-testid="recipe-title">
                {food[foodKeys[0]]}
              </p>
            </div>
            {foodKeys[0] === 'strDrink' ? (
              <p
                data-testid="recipe-category"
                className="RecipeDetails__recipe-category"
              >
                {food.strAlcoholic}
              </p>
            ) : (
              <p
                data-testid="recipe-category"
                className="RecipeDetails__recipe-category"
              >
                { food[foodKeys[2]] }
              </p>)}
            <div className="RecipeDetails__icons-container">
              <input
                type="image"
                alt=""
                data-testid="share-btn"
                src={ shareIcon }
                onClick={ handleShare }
                className="RecipeDetails__icons"
              />
              <input
                type="image"
                alt=""
                src={ favorited ? blackHeartIcon : whiteHeartIcon }
                data-testid="favorite-btn"
                onClick={ handleFavorite }
                className="RecipeDetails__icons"
              />
            </div>
            <img
              data-testid="recipe-photo"
              src={ food[foodKeys[1]] }
              alt={ food[foodKeys[0]] }
              className="RecipeDetails__recipe-details-img"
            />
          </div>
          <h1 className="RecipeDetails__ingredients-title">Ingredients</h1>
          <ul className="RecipeDetails__ingredients-container">
            {ingredientsArray.map((ingredient, index) => (
              <li
                key={ uuid() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient[1]}
                {' '}
                {measuresArray[index] && measuresArray[index][1]}
              </li>))}
          </ul>
          <h1 className="RecipeDetails__instructions-title">Instructions</h1>
          <p data-testid="instructions" className="RecipeDetails__instructions-container">
            {food[foodKeys[3]]}
          </p>
          {foodKeys[0] === 'strMeal' && (
            <iframe
              data-testid="video"
              title={ food[foodKeys[0]] }
              src={ food[foodKeys[4]] }
            />)}
          <h1 className="RecipeDetails__recommended-title">Recommended</h1>
          <div className="RecipeDetails__recommended-container">
            {recomendations.map((recomendation, index) => (
              <div
                key={ uuid() }
                data-testid={ `${index}-recommendation-card` }
                className="RecipeDetails__recomendation-card"
              >
                <div className="RecipeDetails__recomendation-container">
                  <img
                    alt={ recomendation[recomendKey[0]] }
                    src={ recomendation[recomendKey[1]] }
                    className="RecipeDetails__recomendation-img"
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {recomendation[recomendKey[0]]}
                  </p>
                </div>
              </div>))}
          </div>
          <Link
            to={ `${pathname}/in-progress` }
            className="RecipeDetails__start-button-link"
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="RecipeDetails__start-button"
            >
              {inProgress ? 'CONTINUE RECIPE' : 'START RECIPE'}
            </button>
          </Link>
        </div>)}
    </main>
  );
}
RecipeDetails.propTypes = {
  params: PropTypes.object,
}.isRequired;
export default RecipeDetails;
