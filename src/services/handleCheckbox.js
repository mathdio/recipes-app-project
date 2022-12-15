const handleCheckbox = ({ target }, index, id, pathname) => {
  const apiType = pathname.includes('/meals') ? 'meals' : 'drinks';
  const { checked } = target;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (pathname.includes('/meals')
  && !Object.keys(inProgressRecipes.meals).some((key) => key === id)) {
    inProgressRecipes.meals = {
      ...inProgressRecipes.meals,
      [id]: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  } else if (pathname.includes('/drinks')
  && !Object.keys(inProgressRecipes.drinks).some((key) => key === id)) {
    inProgressRecipes.drinks = {
      ...inProgressRecipes.drinks,
      [id]: [],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  if (checked
  && !inProgressRecipes[apiType][id].some((usedIng) => usedIng === index)) {
    inProgressRecipes[apiType][id].push(index);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  } else if (!checked
  && inProgressRecipes[apiType][id].some((usedIng) => usedIng === index)) {
    const newUsedIng = inProgressRecipes[apiType][id]
      .filter((usedIng) => usedIng !== index);
    inProgressRecipes[apiType] = {
      ...inProgressRecipes[apiType],
      [id]: newUsedIng,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};

export default handleCheckbox;
