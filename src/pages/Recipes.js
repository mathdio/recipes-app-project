import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import CardRecipes from '../components/CardRecipes';
import CardCategory from '../components/CardCategory';
import './Recipes.css';

function Recipes({ title, history }) {
  const { resultKey, resultsData, dataDrinks, dataMeals,
    getDataMeals, getDataDrinks, getDrinksCatogories,
    getMealsCatogories, mealsCategories,
    drinksCategories } = useContext(Context);

  const { pathname } = useLocation();
  const [firstRecipes, setfirstRecipes] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [showFirstRecipes, setShowFirstRecipes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    } else if (resultsData.length > 1) {
      const recipesLimit = 12;
      const twelveRecipes = resultsData.filter((_recipe, index) => index < recipesLimit);
      setfirstRecipes(twelveRecipes);
      setFirstRender(false);
      setShowFirstRecipes(true);
    }
  }, [resultsData]);

  useEffect(() => {
    if (pathname === '/meals') {
      setfirstRecipes([]);
      setFirstRender(true);
      getDataMeals();
      getMealsCatogories();
      setShowFirstRecipes(false);
      setIsLoading(false);
    } else if (pathname === '/drinks') {
      setfirstRecipes([]);
      setFirstRender(true);
      getDataDrinks();
      getDrinksCatogories();
      setShowFirstRecipes(false);
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <div className="Recipes__main-container">
      <Header
        title={ title }
        profile
        search
      />
      {showFirstRecipes && (
        <div className="Recipes__cards-container-filter">
          {firstRecipes.map((recipe, index) => (
            <div
              key={ uuid() }
              data-testid={ `${index}-recipe-card` }
              className="Recipes__card"
            >
              <img
                src={ recipe[`str${resultKey[2]}Thumb`] }
                alt={ recipe[`str${resultKey[2]}`] }
                data-testid={ `${index}-card-img` }
                className="Recipes__card-img"
              />
              <p data-testid={ `${index}-card-name` }>
                {recipe[`str${resultKey[2]}`]}
              </p>
            </div>
          ))}
        </div>)}
      {isLoading ? <h1>Loading...</h1>
        : firstRender
        && (title === 'Meals' ? (
          <div>
            <CardCategory
              mealsCategories={ mealsCategories }
              history={ history }
            />
            <CardRecipes
              dataMeals={ dataMeals }
            />
          </div>
        )
          : (
            <div>
              <CardCategory
                drinksCategories={ drinksCategories }
                history={ history }
              />
              <CardRecipes
                dataDrinks={ dataDrinks }
              />
            </div>
          ))}
      <Footer
        drink
        meal
      />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
