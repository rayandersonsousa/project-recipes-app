import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function SearchBar(props) {
  const { buscarAPIReceitasMeals, buscarAPIReceitasDrinks } = useContext(AppContext);
  const [radioDeBusca, setRadioDeBusca] = useState('');
  const [valorDaBusca, setValorDaBusca] = useState('');
  const { pagina } = props;

  const valorDoRadio = ({ target }) => {
    setRadioDeBusca(target.value);
  };

  const valorParaBuscar = ({ target }) => {
    setValorDaBusca(target.value);
    console.log(pagina);
  };

  const qualTipoDeReceitaBuscar = () => {
    if (pagina === 'Meals') {
      return buscarAPIReceitasMeals(radioDeBusca, valorDaBusca);
    }
    return buscarAPIReceitasDrinks(radioDeBusca, valorDaBusca);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ valorParaBuscar }
      />
      <label htmlFor="searchOptions">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchOptions"
          value="ingredient"
          onClick={ valorDoRadio }
        />
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchOptions"
          value="name"
          onClick={ valorDoRadio }
        />
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchOptions"
          value="firstletter"
          onClick={ valorDoRadio }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ qualTipoDeReceitaBuscar }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default SearchBar;
