import React from 'react';
import { waitFor } from '@testing-library/react';
import App from '../App';
import corbaMeal from './mocks/corbaMeal';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import recomendationDrinks from './mocks/recomendationDrinks';
import ggDrink from './mocks/ggDrink';
import recomendationMeals from './mocks/recomendationMeals';

// const SHARE_BTN = 'share-btn';
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
