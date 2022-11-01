import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/Provider';
import firstLetterMeals from './mocks/firstLetterMeals';
import firstLetterDrinks from './mocks/firstLetterDrinks';

const SEARCH_TOP_BTN = 'search-top-btn';

it('testa a procura de drinks com filtro de nome', () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  userEvent.click(drinksIcon);
  const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
  expect(drinksHeading).toBeInTheDocument();

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const searchInput = screen.getByRole('textbox');
  const nameBtn = screen.getByRole('radio', { name: /name/i });
  const searchBtn = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'abc');
  userEvent.click(nameBtn);
  userEvent.click(searchBtn);

  const firstLetterBtn = screen.getByRole('radio', { name: /first letter/i });
  userEvent.type(searchInput, 'a');
  userEvent.click(firstLetterBtn);
  userEvent.click(searchBtn);
});

it('testa a procura de drinks com filtro de primeira letra', () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  userEvent.click(drinksIcon);
  const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
  expect(drinksHeading).toBeInTheDocument();

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const searchInput = screen.getByRole('textbox');
  const firstLetterBtn = screen.getByRole('radio', { name: /first letter/i }); const searchBtn = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'a');
  userEvent.click(firstLetterBtn);
  userEvent.click(searchBtn);
});

it('testa a procura de drinks com filtro de ingrediente', () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  userEvent.click(drinksIcon);
  const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
  expect(drinksHeading).toBeInTheDocument();

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const searchInput = screen.getByRole('textbox');
  const firstLetterBtn = screen.getByRole('radio', { name: /ingredient/i }); const searchBtn = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'vodka');
  userEvent.click(firstLetterBtn);
  userEvent.click(searchBtn);
});

it('testa se é um alerta é chamado caso a pesquisa com filtro de primeira letra tenha duas letras', () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  userEvent.click(drinksIcon);
  const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
  expect(drinksHeading).toBeInTheDocument();

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const firstLetterButton = screen.getByTestId('first-letter-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(firstLetterButton);
  userEvent.type(searchInput, 'aa');
  userEvent.click(searchButton);
});

it('testa se um alerta é chamado caso não seja encontrada nenhuma receita', async () => {
  global.alert = jest.fn().mockReturnValue('Sorry, we haven\'t found any recipes for these filters.');
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(firstLetterMeals),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(firstLetterMeals),
  }).mockResolvedValue({
    json: jest.fn().mockResolvedValue({ meals: null }),
  });

  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const nameButton = screen.getByTestId('name-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(nameButton);
  userEvent.type(searchInput, 'feijoada');
  userEvent.click(searchButton);
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.alert).toHaveBeenCalled();
  });
});

it('testa se na página /meals a API é chamada após pesquisar com filtro de nome e um nome válido', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(firstLetterMeals),
  });

  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const nameButton = screen.getByTestId('name-search-radio');
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  userEvent.click(nameButton);
  userEvent.type(searchInput, 'Arrabiata');
  userEvent.click(searchButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});
