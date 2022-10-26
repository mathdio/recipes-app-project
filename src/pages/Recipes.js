import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import CardRecipes from '../components/CardRecipes';

function Recipes({ title, header, history, footer }) {
  const { resultKey, resultsData, dataDrinks, dataMeals,
    getDataMeals, getDataDrinks } = useContext(Context);

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
    getDataMeals();
    getDataDrinks();
    // console.log(dataMeals);
    // console.log(dataDrinks);
  }, []);

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
