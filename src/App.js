import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/meals/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />) }
      />

      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => (
          <RecipeInProgress { ...props } />) }
      />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />) }
      />

      <Route
        exact
        path="/drinks/:id"
        render={ (props) => (
          <RecipeDetails { ...props } />) }
      />
      <Route
        path="/meals"
        render={ (props) => <Recipes { ...props } title="Meals" /> }
      />

      <Route
        path="/drinks"
        render={ (props) => <Recipes { ...props } title="Drinks" /> }
      />

      <Route
        path="/profile"
        render={ (props) => (<Profile
          { ...props }
          title="Profile"
          footer
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
  );
}

export default App;
