import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { titulo, pesquisa } = props;
  const [searchBar, setSearchBar] = useState(false);

  const showSearchBar = () => {
    setSearchBar((prevState) => !prevState);
  };

  const history = useHistory();

  const paginaDePerfil = () => {
    history.push('/profile');
  };
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
              onClick={ showSearchBar }
            >
              <img src={ searchIcon } alt="searchIcon" />
            </button>
          ) : null
      }
      {
        searchBar && <SearchBar pagina={ titulo } />
      }
      <button type="button" src={ profileIcon } onClick={ paginaDePerfil }>
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
