import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function CardRecipes({ dataMeals, dataDrinks }) {
  console.log(dataDrinks);
  return (
    <div>
      {dataMeals
        && dataMeals.map((meal, index) => (
          <Link key={ index } to={ `/meals/${meal.idMeal}` }>
            <span
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
              <p>
                Pais:
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
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
              <p>
                Copo:
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
