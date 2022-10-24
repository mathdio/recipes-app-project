import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, profile, search }) {
  return (
    <header>
      {profile && <img
        src={ profileIcon }
        alt=""
        data-testid="profile-top-btn"
      />}
      {search && <img
        src={ searchIcon }
        alt=""
        data-testid="search-top-btn"
      />}
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
