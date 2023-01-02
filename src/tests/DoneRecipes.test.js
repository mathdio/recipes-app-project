import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
// import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test pages DoneRecipes', () => {
  it('', () => {
    renderWithRouter(<App />);

    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it('', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByTestId('filter-by-all-btn');
    expect(buttonAll).toBeInTheDocument();
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    expect(buttonMeals).toBeInTheDocument();
    const buttonDrink = screen.getByTestId('filter-by-drink-btn');
    expect(buttonDrink).toBeInTheDocument();
  });
});
