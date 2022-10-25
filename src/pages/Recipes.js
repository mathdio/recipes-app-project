import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes({ title, header }) {
  return (
    <div>
      {header && <Header
        title={ title }
        profile
        search
      />}
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Recipes;
