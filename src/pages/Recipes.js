import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';

function Recipes({ title, header, history }) {
  const { resultKey, resultsData } = useContext(Context);

  useEffect(() => {
    if (resultsData.length === 1) {
      const url = `/${resultKey[0]}/${resultsData[0][resultKey[1]]}`;
      history.push(url);
    }
  }, [resultsData]);

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
