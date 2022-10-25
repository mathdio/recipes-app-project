import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ title, header, footer }) {
  return (
    <div>
      {header && <Header
        title={ title }
        profile
        search
      />}
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
