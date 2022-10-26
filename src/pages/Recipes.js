import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import CardRecipes from '../components/CardRecipes';

function Recipes({ title, header, history, footer }) {
  const { resultKey, resultsData, dataDrinks, dataMeals,
    setIsLoading, setDataMeals, setDataDrinks } = useContext(Context);

  const { pathname } = useLocation();
  const [firstRecipes, setfirstRecipes] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    } else if (resultsData.length > 1) {
      const recipesLimit = 12;
      const twelveRecipes = resultsData.filter((recipe, index) => index < recipesLimit);
      setfirstRecipes(twelveRecipes);
      setFirstRender(false);
    }
  }, [history, resultKey, resultsData]);

  useEffect(() => {
    if (pathname === '/meals') {
      const getDataMeals = async () => {
        const DOZE = 12;
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const newdata = data.meals;
        const filter = newdata.filter((meal, index) => index < DOZE);
        setDataMeals(filter);
      };
      getDataMeals();
    } else if (pathname === '/drinks') {
      const getDataDrinks = async () => {
        const DOZE = 12;
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const newdata = data.drinks;
        const filter = newdata.filter((drink, index) => index < DOZE);
        setIsLoading(true);
        setDataDrinks(filter);
      };
      getDataDrinks();
    }
  }, [pathname]);

  return (
    <div>
      {header && <Header
        title={ title }
        profile
        search
      />}
      <div>
        {firstRecipes.map((recipe, index) => (
          <div key={ uuid() } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe[`str${resultKey[2]}Thumb`] }
              alt={ recipe[`str${resultKey[2]}`] }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>
              {recipe[`str${resultKey[2]}`]}
            </h4>
          </div>
        ))}
      </div>
      {firstRender
        && (title === 'Meals' ? (
          <CardRecipes
            dataMeals={ dataMeals }
            header
          />
        )
          : (
            <CardRecipes
              dataDrinks={ dataDrinks }
              header
            />
          ))}
      {footer && <Footer
        drink
        meal
      />}
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
