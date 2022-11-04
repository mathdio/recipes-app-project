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

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    } else if (resultsData.length > 1) {
      const recipesLimit = 12;
      const twelveRecipes = resultsData.filter((_recipe, index) => index < recipesLimit);
      setfirstRecipes(twelveRecipes);
      setFirstRender(false);
    }
  }, [resultsData]);

  useEffect(() => {
    if (pathname === '/meals') {
      setfirstRecipes([]);
      setFirstRender(true);
      getDataMeals();
      getMealsCatogories();
    } else if (pathname === '/drinks') {
      setfirstRecipes([]);
      setFirstRender(true);
      getDataDrinks();
      getDrinksCatogories();
    }
  }, [pathname]);

  return (
    <div>
      <Header
        title={ title }
        profile
        search
      />
      <div className="cards__container_filter">
        {firstRecipes.map((recipe, index) => (
          <div key={ uuid() } data-testid={ `${index}-recipe-card` } className="cards">
            <img
              src={ recipe[`str${resultKey[2]}Thumb`] }
              alt={ recipe[`str${resultKey[2]}`] }
              data-testid={ `${index}-card-img` }
              className="recipe-img"
            />
            <h4 data-testid={ `${index}-card-name` }>
              {recipe[`str${resultKey[2]}`]}
            </h4>
          </div>
        ))}
      </div>
      {firstRender
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
