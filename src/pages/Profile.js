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
      <p>
        Email:
        {' '}
        {email}
      </p>
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Profile;
