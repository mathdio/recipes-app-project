import PropTypes from 'prop-types';
import React from 'react';

export default function CardCategory({ drinksCategories, mealsCategories }) {
  console.log(drinksCategories);
  console.log(mealsCategories);
  return (
    <div>
      {mealsCategories && mealsCategories.map((categorie, index) => (
        <ul key={ index }>
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
          >
            <li>{categorie.strCategory}</li>
          </button>
        </ul>
      ))}
      {drinksCategories
        && drinksCategories.map((categorie, index) => (
          <ul key={ index }>
            <button
              data-testid={ `${categorie.strCategory}-category-filter` }
              type="button"
            >
              <li>{categorie.strCategory}</li>
            </button>
          </ul>
        ))}
    </div>
  );
}

CardCategory.propTypes = {
  drinksCategories: PropTypes.any,
  mealsCategories: PropTypes.any,
}.isRequired;
