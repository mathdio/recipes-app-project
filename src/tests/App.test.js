import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';

describe('testes da página de Login', () => {
  it('testa se a botão de login renderiza desabilitado e se torna habilitado depois de digitar e-mail e senha válidos', () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');

    expect(buttonSubmit).toBeEnabled();
  });

  it('testa se após clicar no botão de login, o e-mail é salvo no localStorage e a página é redicionada para "/meals"', () => {
    render(
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
  });
});

describe('testes do component Header', () => {
  it('testa se a barra de pesquisa aparece após clicar no ícone de pesquisa', () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });
});

describe('testes do component SearchBar', () => {
  it('testa se é a API é chamada corretamente com o filtro de ingredientes', () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const ingredientButton = screen.getByRole('radio', { name: /ingredient/i });
    const searchBar = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    userEvent.click(ingredientButton);
    userEvent.type(searchBar, 'chicken breast');
    userEvent.click(searchButton);
  });
});
