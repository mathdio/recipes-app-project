import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ title }) {
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
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Profile;
