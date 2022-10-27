import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeDetails({ match }) {
  const { params: { id } } = match;

  const { pathname } = useLocation();
  const [food, setFood] = useState();
  const [foodKeys, setFoodKeys] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [measuresArray, setMeasuresArray] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setFood(data.meals[0]);
      const entries = Object.entries(data.meals[0]);
      const ingredients = entries
        .filter((key) => key[0].includes('strIngredient'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
      const measures = entries
        .filter((key) => key[0].includes('strMeasure'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
      setIngredientsArray(ingredients);
      setMeasuresArray(measures);
      setFoodKeys(['strMeal', 'strMealThumb', 'strCategory',
        'strInstructions', 'strYoutube']);
      setReady(true);
    };
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setFood(data.drinks[0]);
      const entries = Object.entries(data.drinks[0]);
      const ingredients = entries
        .filter((key) => key[0].includes('strIngredient'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
      const measures = entries
        .filter((key) => key[0].includes('strMeasure'))
        .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
      setIngredientsArray(ingredients);
      setMeasuresArray(measures);
      setFoodKeys(['strDrink', 'strDrinkThumb', 'strCategory',
        'strInstructions', 'strYoutube']);
      setReady(true);
    };
    if (pathname.includes('/meals')) {
      fetchMeal();
    } else if (pathname.includes('drinks')) {
      fetchDrink();
    }
  }, []);

  return (
    <div>
      {ready && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
          <h1
            data-testid="recipe-title"
          >
            {food[foodKeys[0]]}
          </h1>
          {foodKeys[0] === 'strDrink' ? (
            <p
              data-testid="recipe-category"
            >
              Drink:
              {' '}
              {food.strAlcoholic}
            </p>
          ) : (
            <p
              data-testid="recipe-category"
            >
              Category:
              {' '}
              { food[foodKeys[2]] }
            </p>
          )}
          <ul>
            Ingredients:
            {' '}
            {ingredientsArray.map((ingredient, index) => (
              <li
                key={ uuid() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient[1]}
                {' '}
                {measuresArray[index][1]}
              </li>
            ))}
          </ul>
          <p
            data-testid="instructions"
          >
            {food[foodKeys[3]]}
          </p>
          {foodKeys[0] === 'strMeal' && (
            <iframe
              data-testid="video"
              title={ food[foodKeys[0]] }
              src={ food[foodKeys[4]] }
            />
          )}
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  params: PropTypes.object,
}.isRequired;

export default RecipeDetails;
