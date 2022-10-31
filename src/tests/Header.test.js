import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';

it('testa se cliar no ícone de procura revela e esconde o input de pesquisa', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
  const passwordInput = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /enter/i });

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(buttonSubmit);
  userEvent.click(buttonSubmit);
  const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
  userEvent.click(searchIcon);
});
