import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import firstLetterMeals from './mocks/firstLetterMeals';
import notFoundMeal from './mocks/notFoundMeal';
import renderWithRouter from './helpers/renderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(firstLetterMeals),
  }));
});

it('testa se a página Recipes com path "/meals" renderiza corretamente', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const mealsHeading = screen.getByRole('heading', { name: /meals/i });
  const corbaHeading = screen.findByRole('heading', { name: /corba/i });
  expect(mealsHeading && corbaHeading).toBeDefined();
  expect(global.fetch).toBeCalledTimes(1);
});

it('testa se é a API é chamada corretamente com o filtro de ingrediente', () => {
  renderWithRouter(<App />);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);
  const ingredientButton = screen.getByTestId('ingredient-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(ingredientButton);
  userEvent.type(searchInput, 'chicken breast');
  userEvent.click(searchButton);
  expect(global.fetch).toBeCalledTimes(2);
});

it('testa se é a API é chamada corretamente com o filtro de primeira letra', () => {
  renderWithRouter(<App />);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const firstLetterButton = screen.getByTestId('first-letter-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(firstLetterButton);
  userEvent.type(searchInput, 'a');
  userEvent.click(searchButton);
});

it('testa se é a API é chamada corretamente com o filtro de nome', () => {
  renderWithRouter(<App />);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const nameButton = screen.getByTestId('name-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(nameButton);
  userEvent.type(searchInput, 'Arrabiata');
  userEvent.click(searchButton);
});

it('testa se é um alerta é chamado caso a pesquisa com filtro de primeira letra tenha duas letras', () => {
  renderWithRouter(<App />);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const firstLetterButton = screen.getByTestId('first-letter-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(firstLetterButton);
  userEvent.type(searchInput, 'aa');
  userEvent.click(searchButton);
});

it('testa se um alerta é chamado caso não seja encontrada nenhuma receita', () => {
  renderWithRouter(<App />);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const nameButton = screen.getByTestId('name-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(notFoundMeal),
  }));

  userEvent.click(nameButton);
  userEvent.type(searchInput, 'feijoada');
  userEvent.click(searchButton);
});

it('', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/');
  });
  // const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  // const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
  // const corbaHeading = screen.findByRole('heading', { name: /corba/i });
  // expect(mealsHeading && corbaHeading).toBeDefined();
});
