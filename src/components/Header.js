import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { titulo, pesquisa } = props;
  return (
    <header>
      <h1 data-testid="page-title">{titulo}</h1>
      {
        pesquisa === 'true'
          ? (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
            >
              <img src={ searchIcon } alt="searchIcon" />
            </button>
          ) : null
      }
      <button type="button" src={ profileIcon }>
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
      </button>
    </header>
  );
}

Header.propTypes = {
  pesquisa: PropTypes.string,
  titulo: PropTypes.string,
}.isRequired;

export default Header;
