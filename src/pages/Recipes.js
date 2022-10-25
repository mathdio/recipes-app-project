import React, { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

function Recipes({ title, header, history, footer }) {
  const { resultKey, resultsData } = useContext(Context);

  const [firstRecipes, setfirstRecipes] = useState([]);

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    } else if (resultsData.length > 1) {
      const recipesLimit = 12;
      const twelveRecipes = resultsData.filter((recipe, index) => index < recipesLimit);
      setfirstRecipes(twelveRecipes);
    }
  }, [resultsData]);

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
