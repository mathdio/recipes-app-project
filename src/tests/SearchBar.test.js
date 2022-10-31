import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';

it('testa a procura de drinks com filtro de nome', () => {
  renderWithRouter(<App />);
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
  renderWithRouter(<App />);

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const searchInput = screen.getByRole('textbox');
  const firstLetterBtn = screen.getByRole('radio', { name: /first letter/i }); const searchBtn = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'a');
  userEvent.click(firstLetterBtn);
  userEvent.click(searchBtn);
});

it('testa a procura de drinks com filtro de ingrediente', () => {
  renderWithRouter(<App />);

  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);

  const searchInput = screen.getByRole('textbox');
  const firstLetterBtn = screen.getByRole('radio', { name: /ingredient/i }); const searchBtn = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchInput, 'vodka');
  userEvent.click(firstLetterBtn);
  userEvent.click(searchBtn);
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

  userEvent.click(nameButton);
  userEvent.type(searchInput, 'feijoada');
  userEvent.click(searchButton);
  act(() => {
    global.alert = jest.fn();
  });
  expect(global.alert).toHaveBeenCalled();
});
