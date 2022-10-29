import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from './helper/renderWithRouter';

describe('Testa a tela do componente Profile', () => {
  afterEach(cleanup);
  test('testa se os botoẽs renderizam na pagina', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorites = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnDone).toBeDefined();
    expect(btnFavorites).toBeDefined();
    expect(btnLogout).toBeDefined();
  });

  test('testa se o botoão Logout retorna a página de login', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
