import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer({ drink, meal }) {
  return (
    <footer data-testid="footer" className="footer">
      {drink && (
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt=""
            data-testid="drinks-bottom-btn"
          />
        </Link>)}
      {meal && (
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt=""
            data-testid="meals-bottom-btn"
          />
        </Link>)}
    </footer>
  );
}

Footer.propTypes = {
  drink: PropTypes.any,
  meal: PropTypes.any,
}.isRequired;
