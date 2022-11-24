import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './CardRecipes.css';

export default function CardRecipes({ dataMeals, dataDrinks }) {
  return (
    <div className="CardRecipes__cards-container">
      {dataMeals
        && dataMeals.map((meal, index) => (
          <Link key={ index } to={ `/meals/${meal.idMeal}` }>
            <span
              data-testid={ `${index}-recipe-card` }
              className="CardRecipes__card"
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
                className="CardRecipes__title"
              >
                {meal.strMeal}
              </p>
              <p>
                Nationality:
                {' '}
                {meal.strArea}
              </p>
            </span>
          </Link>
        ))}
      { dataDrinks
        && dataDrinks.map((drink, index) => (
          <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
            <span
              data-testid={ `${index}-recipe-card` }
              className="CardRecipes__card"
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
                className="CardRecipes__title"
              >
                {drink.strDrink}
              </p>
              <p>
                Cup:
                {' '}
                {drink.strGlass}
              </p>
            </span>
          </Link>
        ))}
    </div>
  );
}

CardRecipes.propTypes = {
  dataDrinks: PropTypes.any,
  dataMeals: PropTypes.any,
}.isRequired;
