import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ title }) {
  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
    </div>
  );
}

DoneRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default DoneRecipes;
