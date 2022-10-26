import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import CardRecipes from '../components/CardRecipes';

function Recipes({ title, header, history, footer }) {
  const { resultKey, resultsData, dataDrinks, dataMeals } = useContext(Context);

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    }
  }, [history, resultKey, resultsData]);

  return (
    <div>
      {header && <Header
        title={ title }
        profile
        search
      />}
      {
        title === 'Meals' ? (
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
          )
      }
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
