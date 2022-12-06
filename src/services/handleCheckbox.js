const handleCheckbox = ({ target }, index, id, pathname) => {
  const { checked } = target;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  console.log(checked);

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

  if (pathname.includes('/meals')
  && checked
  && !inProgressRecipes.meals[id].some((usedIng) => usedIng === index)) {
    inProgressRecipes.meals[id].push(index);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    console.log('teste');
  } else if (pathname.includes('/meals')
  && !checked
  && inProgressRecipes.meals[id].some((usedIng) => usedIng === index)) {
    const newUsedIng = inProgressRecipes.meals[id].filter((usedIng) => usedIng !== index);
    inProgressRecipes.meals = {
      ...inProgressRecipes.meals,
      [id]: newUsedIng,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  console.log(inProgressRecipes);
};

export default handleCheckbox;
