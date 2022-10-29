import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes da página de Login', () => {
  it('testa se a botão de login renderiza desabilitado e se torna habilitado depois de digitar e-mail e senha válidos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');

    expect(buttonSubmit).toBeEnabled();
  });

  it('testa se é possível fazer login, ', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const buttonSubmit = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(buttonSubmit);
  });
});
