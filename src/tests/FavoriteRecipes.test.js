import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

// const FAVORITE_BTN = '1-horizontal-favorite-btn';
const FAVORITE_PAGE_PATHNAME = '/favorite-recipes';
const SHARE_BTN = '1-horizontal-share-btn';
const favoriteRecipesArray = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

it('testa se ao clicar no botão de desfavoritar, a receita é retirada da lista de favoritos', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
  renderWithRouterAndContext(<App />, FAVORITE_PAGE_PATHNAME);

  const favoriteBtnTwo = await screen.findByTestId('1-horizontal-favorite-btn');
  userEvent.click(favoriteBtnTwo);
  const favoriteBtnOne = await screen.findByTestId('0-horizontal-favorite-btn');
  userEvent.click(favoriteBtnOne);
});

it('testa se as comidas são filtradas ao clicar no botão', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
  renderWithRouterAndContext(<App />, FAVORITE_PAGE_PATHNAME);

  const filterMealsBtn = screen.getByRole('button', { name: /meals/i });
  userEvent.click(filterMealsBtn);

  const filterDrinksBtn = screen.getByRole('button', { name: /drinks/i });
  userEvent.click(filterDrinksBtn);
});

it('testa se os drinks são filtrados ao clicar no botão', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
  renderWithRouterAndContext(<App />, FAVORITE_PAGE_PATHNAME);

  const AllBtn = screen.getByRole('button', { name: /all/i });
  userEvent.click(AllBtn);
});

it('testa o clique no botão de compartilhar', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArray));
  window.document.execCommand = jest.fn(() => true);
  renderWithRouterAndContext(<App />, FAVORITE_PAGE_PATHNAME);

  const shareBtns = await screen.findAllByTestId(SHARE_BTN);
  userEvent.click(shareBtns[0]);
});
