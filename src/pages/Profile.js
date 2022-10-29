import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ title, history }) {
  const email = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : { email: '' };

  const handleClickLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      <p data-testid="profile-email">
        Email:
        {' '}
        {email.email}
      </p>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer
        title={ title }
        drink
        meal
      />
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;
