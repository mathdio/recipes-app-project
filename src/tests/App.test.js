// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import Provider from '../context/Provider';
// import firstLetterDrinks from './mocks/firstLetterDrinks';
// import firstLetterMeals from './mocks/firstLetterMeals';
// import notFoundMeal from './mocks/notFoundMeal';

// const SEARCH_TOP_BTN = 'search-top-btn';
// describe('testes da página de Login', () => {
//   it('testa se a botão de login renderiza desabilitado e se torna habilitado depois de digitar e-mail e senha válidos', () => {
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );

//     const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
//     const passwordInput = screen.getByRole('textbox', { name: /senha/i });
//     const buttonSubmit = screen.getByRole('button', { name: /enter/i });
//     expect(buttonSubmit).toBeDisabled();

//     userEvent.type(emailInput, 'teste@teste.com');
//     userEvent.type(passwordInput, '1234567');

//     expect(buttonSubmit).toBeEnabled();
//   });

//   it('testa se após clicar no botão de login, o e-mail é salvo no localStorage e a página é redicionada para "/meals"', () => {
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );

//     const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
//     const passwordInput = screen.getByRole('textbox', { name: /senha/i });
//     const buttonSubmit = screen.getByRole('button', { name: /enter/i });

//     userEvent.type(emailInput, 'teste@teste.com');
//     userEvent.type(passwordInput, '1234567');
//     userEvent.click(buttonSubmit);
//   });
// });

// describe('testes do componente Header', () => {
//   it('testa se a barra de pesquisa aparece após clicar no ícone de pesquisa', () => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(firstLetterDrinks),
//     }));
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );

//     const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
//     const passwordInput = screen.getByRole('textbox', { name: /senha/i });
//     const buttonSubmit = screen.getByRole('button', { name: /enter/i });
//     expect(buttonSubmit).toBeDisabled();
//     userEvent.type(emailInput, 'teste@teste.com');
//     userEvent.type(passwordInput, '1234567');
//     userEvent.click(buttonSubmit);

//     // const searchIcon = screen.findByTestId(SEARCH_TOP_BTN);
//     // expect(searchIcon).toBeInTheDocument();
//     // userEvent.click(searchIcon);

//     // const searchBar = screen.getByRole('textbox');
//     // expect(searchBar).toBeInTheDocument();
//   });
// });

// describe('testes do componente SearchBar', () => {
//   it('testa se é a API é chamada corretamente com o filtro de ingredientes', () => {
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );
//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const ingredientButton = screen.getByRole('radio', { name: /ingredient/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(ingredientButton);
//     userEvent.type(searchBar, 'chicken breast');
//     userEvent.click(searchButton);
//   });

//   it('testa se é a API é chamada corretamente com o filtro de nome', () => {
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );
//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const nameButton = screen.getByRole('radio', { name: /name/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(nameButton);
//     userEvent.type(searchBar, 'a');
//     userEvent.click(searchButton);
//   });

//   it('testa se é a API é chamada corretamente com o filtro de primeira letra', () => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(firstLetterMeals),
//     }));

//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );
//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const firstLetterButton = screen.getByRole('radio', { name: /first letter/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(firstLetterButton);
//     userEvent.type(searchBar, 'a');
//     userEvent.click(searchButton);
//   });

//   it('testa se um alerta é chamado ao tentar chamar a API com o filtro de primeira letra e digitando duas letras', () => {
//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );
//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const firstLetterButton = screen.getByRole('radio', { name: /first letter/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(firstLetterButton);
//     userEvent.type(searchBar, 'aa');
//     userEvent.click(searchButton);
//   });

//   it('testa se um alerta é chamado caso a API não encontre resultado', () => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(notFoundMeal),
//     }));

//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );

//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const nameButton = screen.getByRole('radio', { name: /name/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(nameButton);
//     userEvent.type(searchBar, 'feijoada');
//     userEvent.click(searchButton);
//   });
// });

// describe('testes da página Recipes com o caminho "/drinks"', () => {
//   it('testa se a página Drinks é renderizada após clicar no ícone de drinks', () => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(firstLetterDrinks),
//     }));

//     render(
//       <Provider>
//         <App />
//       </Provider>,
//     );

//     const drinksIcon = screen.getByTestId('drinks-bottom-btn');
//     userEvent.click(drinksIcon);
//     expect(drinksIcon).toBeInTheDocument();

//     const drinksHeading = screen.getByRole('heading', { name: /drinks/i });
//     expect(drinksHeading).toBeInTheDocument();

//     const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
//     userEvent.click(searchIcon);

//     const nameButton = screen.getByRole('radio', { name: /name/i });
//     const searchBar = screen.getByRole('textbox');
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     userEvent.click(nameButton);
//     userEvent.type(searchBar, 'a');
//     userEvent.click(searchButton);
//   });
// });
