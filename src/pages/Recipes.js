import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import CardRecipes from '../components/CardRecipes';

function Recipes({ title, header, footer }) {
  const { dataDrinks, dataMeals } = useContext(Context);
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
