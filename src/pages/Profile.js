import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import doneIcon from '../images/doneIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import './Profile.css';

function Profile({ title, history }) {
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      history.push('/');
    } else {
      setUserEmail(localStorage.getItem('user'));
    }
  }, []);

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
      <main className="Profile__buttons-container">
        <p
          data-testid="profile-email"
          className="email-container"
        >
          Email:
          {' '}
          {userEmail}
        </p>
        <Link to="/done-recipes">
          <label
            className="Profile__label-button"
            htmlFor="profile-done-btn"
          >
            <input
              id="profile-done-btn"
              type="image"
              alt=""
              src={ doneIcon }
              data-testid="profile-done-btn"
              className="profile-page-icons"
            />
            Done Recipes
          </label>
          {/* <button type="button" data-testid="profile-done-btn">Done Recipes</button> */}
        </Link>
        <Link to="/favorite-recipes">
          <label
            htmlFor="profile-favorite-btn"
            className="Profile__label-button"
          >
            <input
              id="profile-favorite-btn"
              type="image"
              alt=""
              src={ favoriteIcon }
              data-testid="profile-favorite-btn"
              className="profile-page-icons"
            />
            Favorite Recipes
          </label>
          {/* <button type="button" data-testid="profile-favorite-btn">
            Favorite Recipes
          </button> */}
        </Link>
        <label
          htmlFor="profile-logout-btn"
          className="Profile__label-button"
        >
          <input
            id="profile-logout-btn"
            type="image"
            alt=""
            src={ logoutIcon }
            data-testid="profile-logout-btn"
            className="profile-page-icons"
            onClick={ handleClickLogout }
          />
          Logout
        </label>
        {/* <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout
        </button> */}
      </main>
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
