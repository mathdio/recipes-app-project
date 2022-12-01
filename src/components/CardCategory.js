import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import './CardCategory.css';

export default function CardCategory({ drinksCategories, mealsCategories, history }) {
  const { setDataMeals, setDataDrinks, getDataMeals,
    getDataDrinks } = useContext(Context);
  const [toogle, setToogle] = useState(true);

  const sendMealsValue = async (search) => {
    if (toogle === true) {
      const DOZE = 12;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`;
      const response = await fetch(url);
      const data = await response.json();
      const newdata = data.meals;
      const filter = newdata.filter((_meals, index) => index < DOZE);
      setDataMeals(filter);
      setToogle(false);
    } else {
      getDataMeals();
      setToogle(true);
    }
  };

  const sendDrinksValue = async (search) => {
    if (toogle === true) {
      const DOZE = 12;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`;
      const response = await fetch(url);
      const data = await response.json();
      const newdata = data.drinks;
      const filter = newdata.filter((_drinks, index) => index < DOZE);
      setDataDrinks(filter);
      setToogle(false);
    } else {
      getDataDrinks();
      setToogle(true);
    }
  };

  const removeAllFilters = () => {
    const { location: { pathname } } = history;
    if (pathname === '/drinks') {
      getDataDrinks();
    } else {
      getDataMeals();
    }
  };

  return (
    <div className="CardCategory__container">
      <input
        type="button"
        value="All"
        data-testid="All-category-filter"
        onClick={ removeAllFilters }
        className="CardCategory__button"
      />
      {mealsCategories && mealsCategories.map((categorie, index) => (
        <input
          key={ index }
          data-testid={ `${categorie.strCategory}-category-filter` }
          type="button"
          onClick={ () => sendMealsValue(categorie.strCategory) }
          value={ categorie.strCategory }
          className="CardCategory__button"
        />
      ))}
      {drinksCategories
        && drinksCategories.map((categorie, index) => (
          <input
            key={ index }
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            onClick={ () => sendDrinksValue(categorie.strCategory) }
            value={ categorie.strCategory }
            className="CardCategory__button"
          />
        ))}
    </div>
  );
}

CardCategory.propTypes = {
  drinksCategories: PropTypes.any,
  mealsCategories: PropTypes.any,
}.isRequired;
