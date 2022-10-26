import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ title }) {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
      <Footer
        title={ title }
        drink
        meal
      />
      <p data-testid="profile-email">
        Email:
        {' '}
        {email}
      </p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Profile;
