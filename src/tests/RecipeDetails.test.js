import React from 'react';
import { waitFor } from '@testing-library/react';
import App from '../App';
import corbaMeal from './mocks/corbaMeal';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import recomendationDrinks from './mocks/recomendationDrinks';
import ggDrink from './mocks/ggDrink';
import recomendationsMeals from './mocks/recomendationMeals';

// const SHARE_BTN = 'share-btn';

it('testa se a página detalhada da receita de Corba renderiza corretamente', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(corbaMeal),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationDrinks),
  });
  renderWithRouterAndContext(<App />, '/meals/52977');

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

it('testa se a página detalhada da receita do drink GG renderiza corretamente', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(ggDrink),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(recomendationsMeals),
  });
  renderWithRouterAndContext(<App />, '/drinks/15997');

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
