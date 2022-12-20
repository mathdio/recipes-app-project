import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './CardRecipes.css';

export default function CardRecipes({ dataMeals, dataDrinks }) {
  return (
    <div className="CardRecipes__cards-container">
      {dataMeals
        && dataMeals.map((meal, index) => (
          <Link
            key={ index }
            to={ `/meals/${meal.idMeal}` }
            className="CardRecipes__card-link"
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="CardRecipes__card"
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <div className="CardRecipes__card-text">
                <p
                  data-testid={ `${index}-card-name` }
                  className="CardRecipes__title"
                >
                  {meal.strMeal}
                </p>
                {meal.strArea && (
                  <p className="CardRecipes__info">
                    Nationality:
                    {' '}
                    {meal.strArea}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      { dataDrinks
        && dataDrinks.map((drink, index) => (
          <Link
            key={ index }
            to={ `/drinks/${drink.idDrink}` }
            className="CardRecipes__card-link"
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="CardRecipes__card"
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <div className="CardRecipes__card-text">
                <p
                  data-testid={ `${index}-card-name` }
                  className="CardRecipes__title"
                >
                  {drink.strDrink}
                </p>
                {drink.strGlass && (
                  <p className="CardRecipes__info">
                    Cup:
                    {' '}
                    {drink.strGlass}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

CardRecipes.propTypes = {
  dataDrinks: PropTypes.any,
  dataMeals: PropTypes.any,
}.isRequired;
