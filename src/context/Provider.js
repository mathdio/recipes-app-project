import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState('true');
  const [searchRecipe, setSearchRecipe] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [resultKey, setResultKey] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  const contextValue = useMemo(() => ({
    isLoading,
    setIsLoading,
    dataMeals,
    dataDrinks,
    email,
    setEmail,
    password,
    setPassword,
    submitDisabled,
    setSubmitDisabled,
    searchRecipe,
    setSearchRecipe,
    filterValue,
    setFilterValue,
    resultKey,
    setResultKey,
    resultsData,
    setResultsData,
    setDataMeals,
    setDataDrinks,
    // getDataMeals,
    // getDataDrinks,
  }), [dataDrinks, dataMeals, email, isLoading,
    password, submitDisabled,
    searchRecipe, filterValue,
    resultKey, resultsData]);

  useEffect(() => {
    const RegEx = /\S+@\S+\.\S+/;

    const passwordLength = 6;
    if (RegEx.test(email) && password.length > passwordLength) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email, password]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
