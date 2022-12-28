import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import corbaMeal from './mocks/corbaMeal';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import recomendationDrinks from './mocks/recomendationDrinks';
import ggDrink from './mocks/ggDrink';
import recomendationMeals from './mocks/recomendationMeals';

const FAVORITE_BTN = 'favorite-btn';
const SHARE_BTN = 'share-btn';
const MEAL_DETAIL_PATHNAME = '/meals/52977';
const DRINK_DETAIL_PATHNAME = '/drinks/15997';

it('testa se a página detalhada da receita de Corba renderiza corretamente', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(corbaMeal),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationDrinks),
  });
  renderWithRouterAndContext(<App />, MEAL_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa a renderização da página de detalhes de uma receita de meal em progresso', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(corbaMeal),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationDrinks),
  });
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [] }, drinks: {} }));
  renderWithRouterAndContext(<App />, MEAL_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa a renderização da página de detalhes de uma receita de meal feita', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(corbaMeal),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationDrinks),
  });
  const doneRecipe = {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  };
  localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
  renderWithRouterAndContext(<App />, MEAL_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa se a página detalhada da receita do drink GG renderiza corretamente', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationMeals),
  });
  renderWithRouterAndContext(<App />, DRINK_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa a renderização da página de detalhes de uma receita de drink em progresso', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationMeals),
  });
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: { 15997: [] } }));
  renderWithRouterAndContext(<App />, DRINK_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa a renderização da página de detalhes de uma receita de drink favoritada', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationMeals),
  });
  const favoriteRecipes = {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  };
  localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
  renderWithRouterAndContext(<App />, DRINK_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa na página de um drink se dois cliques no botão de favoritar, adiciona e retira a receita dos favoritos', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationMeals),
  });

  renderWithRouterAndContext(<App />, DRINK_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
  userEvent.click(favoriteBtn);
  userEvent.click(favoriteBtn);
});

it('testa na página de um prato se dois cliques no botão de favoritar, adiciona e retira a receita dos favoritos', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(corbaMeal),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationDrinks),
  });

  renderWithRouterAndContext(<App />, MEAL_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  const favoriteBtn = await screen.findByTestId(FAVORITE_BTN);
  userEvent.click(favoriteBtn);
  userEvent.click(favoriteBtn);
});

it('testa o clique no botão de compartilhar', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationMeals),
  });
  window.document.execCommand = jest.fn(() => true);

  renderWithRouterAndContext(<App />, DRINK_DETAIL_PATHNAME);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  const shareBtn = await screen.findByTestId(SHARE_BTN);
  userEvent.click(shareBtn);
});
