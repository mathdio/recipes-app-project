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
    <div className="Header__main-div">
      <header className="Header__header-container">
        <h1
          data-testid="page-title"
          className="Header__title-container"
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
                className="Header__profile-icon"
                width="30px"
              />
            </Link>)}
          {search && <input
            type="image"
            src={ searchIcon }
            alt=""
            data-testid="search-top-btn"
            onClick={ handleSearchClick }
            className="Header__icons-container"
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
