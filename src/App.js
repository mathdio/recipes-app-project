import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
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
          />) }
        />
        <Route
          path="/done-recipes"
          component={ DoneRecipes }
          title="Done Recipes"
          profile
          search={ false }
        />
        <Route
          path="/favorite-recipes"
          component={ FavoriteRecipes }
          title="Favorite Recipes"
          profile
          search={ false }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
