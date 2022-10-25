import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, profile, search }) {
  return (
    <header>
      {profile && (
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt=""
            data-testid="profile-top-btn"
          />
        </Link>)}
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
