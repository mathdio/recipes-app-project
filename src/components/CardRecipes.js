import PropTypes from 'prop-types';
import React from 'react';

export default function CardRecipes({ dataMeals, dataDrinks }) {
  return (
    <div>
      {dataMeals
        && dataMeals.map((meal, index) => (
          <span
            key={ index }
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
              {meal.srtArea}
            </p>
          </span>
        ))}
      { dataDrinks
        && dataDrinks.map((drink, index) => (
          <span
            key={ index }
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
        ))}
    </div>
  );
}

CardRecipes.propTypes = {
  dataDrinks: PropTypes.any,
  dataMeals: PropTypes.any,
}.isRequired;
