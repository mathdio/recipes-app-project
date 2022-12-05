const handleCheckbox = ({ checked }, index, id) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
  if (pathname.includes('/meals')) {
    const keysInProgress = Object.keys(inProgressRecipes.meals);
    if (keysInProgress.some((idInProgress) => idInProgress === id)) {
      if (checked
            && !inProgressRecipes.meals.id.some((ingredient) => ingredient === index)) {
        inProgressRecipes.meals.id.push(index);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      } else if (!checked
            && inProgressRecipes.meals.id.some((ingredient) => ingredient === index)) {
        const newInProgress = inProgressRecipes.meals.id
          .filter((ingredient) => ingredient !== index);
        inProgressRecipes.meals = {
          ...inProgress.meals,
          id: newInProgress,
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
    }
  } else {
    const keysInProgress = Object.keys(inProgressRecipes.drinks);
    if (keysInProgress.some((idInProgress) => idInProgress === id)) {
      if (checked
          && !inProgressRecipes.drinks.id.some((ingredient) => ingredient === index)) {
        inProgressRecipes.drinks.id.push(index);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      } else if (!checked
          && inProgressRecipes.drinks.id.some((ingredient) => ingredient === index)) {
        const newInProgress = inProgressRecipes.drinks.id
          .filter((ingredient) => ingredient !== index);
        inProgressRecipes.drinks = {
          ...inProgress.drinks,
          id: newInProgress,
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
    }
  }
};

export default handleCheckbox;
