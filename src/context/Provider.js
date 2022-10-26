import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataMeals, setDataMeals] = useState();
  const [dataDrinks, setDataDrinks] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState('true');
  const [searchRecipe, setSearchRecipe] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [resultKey, setResultKey] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  const getDataMeals = async () => {
    const DOZE = 12;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newdata = data.meals;
    const filter = newdata.filter((meal, index) => index < DOZE);
    setDataMeals(filter);
  };

  const getDataDrinks = async () => {
    const DOZE = 12;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newdata = data.drinks;
    const filter = newdata.filter((drink, index) => index < DOZE);
    setIsLoading(true);
    setDataDrinks(filter);
  };

  const contextValue = useMemo(() => ({
    isLoading,
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
    getDataMeals,
    getDataDrinks,
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
