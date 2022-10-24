import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';

describe('testes da página de Login', () => {
  it('', () => {
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
});

// test('Farewell, front-end', () => {
//   // Este arquivo pode ser modificado ou deletado sem problemas
//   render(<App />);
//   const linkElement = screen.getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });
