const fetchMeal = async ({
  id,
  setFood,
  setIngredientsArray,
  setMeasuresArray,
  setFoodKeys,
  setReady,
}) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  setFood(data.meals[0]);
  const entries = Object.entries(data.meals[0]);
  const ingredients = entries
    .filter((key) => key[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  const measures = entries
    .filter((key) => key[0].includes('strMeasure'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  setIngredientsArray(ingredients);
  setMeasuresArray(measures);
  setFoodKeys(['strMeal', 'strMealThumb', 'strCategory',
    'strInstructions', 'strYoutube']);
  setReady(true);
};

const fetchDrink = async ({
  id,
  setFood,
  setIngredientsArray,
  setMeasuresArray,
  setFoodKeys,
  setReady,
}) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  setFood(data.drinks[0]);
  const entries = Object.entries(data.drinks[0]);
  const ingredients = entries
    .filter((key) => key[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  const measures = entries
    .filter((key) => key[0].includes('strMeasure'))
    .filter((ingredient) => ingredient[1] !== '' && ingredient[1] !== null);
  setIngredientsArray(ingredients);
  setMeasuresArray(measures);
  setFoodKeys(['strDrink', 'strDrinkThumb', 'strCategory',
    'strInstructions', 'strYoutube']);
  setReady(true);
};

const fetchRecomendationsMeals = async ({ setRecomendations, setRecomendKey }) => {
  const responseRecomendations = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataRecomendation = await responseRecomendations.json();

  const recomendationsLimit = 6;
  const sixRecomendations = dataRecomendation.meals
    .filter((meal, index) => index < recomendationsLimit);
  setRecomendations(sixRecomendations);
  setRecomendKey('strMeal');
};

const fetchRecomendationsDrinks = async ({ setRecomendations, setRecomendKey }) => {
  const responseRecomendations = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataRecomendation = await responseRecomendations.json();

  const recomendationsLimit = 6;
  const sixRecomendations = dataRecomendation.drinks
    .filter((drink, index) => index < recomendationsLimit);
  setRecomendations(sixRecomendations);
  setRecomendKey('strDrink');
};

export { fetchMeal, fetchDrink, fetchRecomendationsMeals, fetchRecomendationsDrinks };
