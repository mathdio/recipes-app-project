import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Profile({ title }) {
  return (
    <div>
      <Header
        title={ title }
        profile
        search={ false }
      />
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Profile;
