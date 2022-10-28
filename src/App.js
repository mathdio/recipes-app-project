import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/Provider';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            render={ (props) => (
              <RecipeInProgress { ...props } header={ false } footer={ false } />) }
          />

          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            render={ (props) => (
              <RecipeInProgress { ...props } header={ false } footer={ false } />) }
          />

          <Route
            path="/meals/:id"
            render={ (props) => (
              <RecipeDetails { ...props } APItype="meals" />) }
          />

          <Route
            path="/drinks/:id"
            render={ (props) => (
              <RecipeDetails { ...props } APItype="drinks" />) }
          />

          <Route
            path="/meals"
            render={ (props) => <Recipes { ...props } title="Meals" header footer /> }
          />

          <Route
            path="/drinks"
            render={ (props) => <Recipes { ...props } title="Drinks" header footer /> }
          />

          <Route
            path="/profile"
            render={ (props) => (<Profile
              { ...props }
              title="Profile"
            />) }
          />

          <Route
            path="/done-recipes"
            render={ (props) => <DoneRecipes { ...props } title="Done Recipes" /> }
          />

          <Route
            path="/favorite-recipes"
            render={ (props) => (
              <FavoriteRecipes { ...props } title="Favorite Recipes" />) }
          />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
