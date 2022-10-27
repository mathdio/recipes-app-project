import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeDetails({ match }) {
  const { params: { id } } = match;

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchMeal = async () => {
      await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    };
    const fetchDrink = async () => {
      await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    };
    if (pathname.includes('/meals')) {
      fetchMeal();
    } else if (pathname.includes('drinks')) {
      fetchDrink();
    }
  }, []);

  return (
    <div>Details</div>
  );
}

RecipeDetails.propTypes = {
  params: PropTypes.object,
}.isRequired;

export default RecipeDetails;
