import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const recipesDone = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'http://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'http://www.thecocktaildb.com/images/media/drinks/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },

];

function DoneRecipes({ title }) {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipeCurrent, setRecipeCurrent] = useState('');
  const [message, setMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('done-recipes', JSON.stringify(recipesDone));
    // tests

    const recipes = JSON.parse(localStorage.getItem('done-recipes'));
    console.log(recipes);
    setDoneRecipes(recipes);
  }, []);

  const filterDoneRecipes = (recipes) => setRecipeCurrent(recipes);

  const redirect = (recipe, id) => {
    const path = `/${recipe}/${id}`;
    history.push(path);
  };

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      <button
        onClick={ () => filterDoneRecipes('') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterDoneRecipes('meal') }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterDoneRecipes('drink') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {
        doneRecipes.filter((item) => item.type.includes(recipeCurrent))
          .map((item, index) => (
            <div key={ item.id }>
              <label htmlFor="meal">
                <input
                  type="image"
                  onClick={ item.type === 'meal'
                    ? () => redirect('meals', item.id)
                    : () => redirect('drinks', item.id) }
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.name }
                  width="200"
                />
              </label>
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                { item.type === 'meal'
                  ? `${item.nationality} - ${item.category}`
                  : item.alcoholicOrNot}
              </h4>
              <button
                type="button"
                onClick={ item.type === 'meal'
                  ? () => redirect('meals', item.id)
                  : () => redirect('drinks', item.id) }
                data-testid={ `${index}-horizontal-name` }
              >
                {item.name}
              </button>
              <h4 data-testid={ `${index}-horizontal-done-date` }>
                {item.doneDate}
              </h4>
              <label
                htmlFor="image"
              >
                <input
                  type="image"
                  onClick={ () => {
                    setMessage(true);
                    if (item.type === 'meal') {
                      copy(`http://localhost:3000/meals/${item.id}`);
                    } else {
                      copy(`http://localhost:3000/drinks/${item.id}`);
                    }
                  } }
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt={ item.name }
                  width="20"
                />
              </label>

              {message && <p>Link copied!</p>}

              {item.tags.map((tag) => (
                <li key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </li>
              ))}

            </div>
          ))
      }
    </div>
  );
}

DoneRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default DoneRecipes;
