import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title, profile, search }) {
  const [searchInput, setSearchInput] = useState(false);

  const handleSearchClick = () => {
    setSearchInput(!searchInput);
  };

  return (
    <div className="div_header">
      <header className="header__container">
        <h1
          data-testid="page-title"
          className="title_container"
        >
          {title}
        </h1>
        <div className="icons__container">
          {profile && (
            <Link to="/profile">
              <input
                type="image"
                src={ profileIcon }
                alt=""
                data-testid="profile-top-btn"
                className="profile__icon"
                width="30px"
              />
            </Link>)}
          {search && <input
            type="image"
            src={ searchIcon }
            alt=""
            data-testid="search-top-btn"
            onClick={ handleSearchClick }
            className="search__icon"
            width="30px"
          />}
        </div>
      </header>
      {searchInput && (
        <SearchBar />
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
