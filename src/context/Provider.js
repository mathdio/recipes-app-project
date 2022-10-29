import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // const [searchMeals, setSearchMeals] = useState('list');
  // const [searchDrinks, setSearchDrinks] = useState('list');
  const [dataMeals, setDataMeals] = useState();
  const [dataDrinks, setDataDrinks] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState('true');
  const [searchRecipe, setSearchRecipe] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [resultKey, setResultKey] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [mealsCategories, setMealsCategories] = useState();
  const [drinksCategories, setDrinksCategories] = useState();

  const getDataMeals = useCallback(async () => {
    const DOZE = 12;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newdata = data.meals;
    const filter = newdata.filter((_meal, index) => index < DOZE);
    setDataMeals(filter);
  }, []);

  const getDataDrinks = useCallback(async () => {
    const DOZE = 12;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const newdata = data.drinks;
    const filter = newdata.filter((_drink, index) => index < DOZE);
    setDataDrinks(filter);
  }, []);

  const getMealsCatogories = useCallback(async () => {
    const CINCO = 5;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newdata = data.meals;
    const filter = newdata.filter((_meals, index) => index < CINCO);
    setMealsCategories(filter);
  }, []);

  const getDrinksCatogories = useCallback(async () => {
    const CINCO = 5;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const newdata = data.drinks;
    const filter = newdata.filter((_drinks, index) => index < CINCO);
    setDrinksCategories(filter);
  }, []);

  const contextValue = useMemo(() => ({
    setDataMeals,
    setDataDrinks,
    mealsCategories,
    drinksCategories,
    getDrinksCatogories,
    getMealsCatogories,
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
  }), [mealsCategories, drinksCategories, getDrinksCatogories,
    getMealsCatogories, dataMeals, dataDrinks,
    email, password, submitDisabled, searchRecipe,
    filterValue, resultKey, resultsData, getDataMeals, getDataDrinks]);

  useEffect(() => {
    const RegEx = /\S+@\S+\.\S+/;
    const passwordLength = 6;
    if (RegEx.test(email) && password.length > passwordLength) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email, getDataDrinks,
    getDataMeals, getDrinksCatogories,
    getMealsCatogories, password]);

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
