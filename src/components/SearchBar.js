import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import CardFood from './cardFood';

function SearchBar(props) {
  const { buscarAPIReceitasMeals,
    buscarAPIReceitasDrinks, recipesMeals, recipesDrinks,
    // receitasBuscadas,
    setReceitasBuscadas,
    // imagemReceita,
    setImagemReceita,
    // nomeReceita,
    setNomeReceita,
    // idReceita,
    // setIdReceita,
  } = useContext(AppContext);
  const [radioDeBusca, setRadioDeBusca] = useState('');
  const [valorDaBusca, setValorDaBusca] = useState('');
  // const [idReceita, setIdReceita] = useState('');
  const { pagina } = props;
  const history = useHistory();

  const valorDoRadio = ({ target }) => {
    setRadioDeBusca(target.value);
  };

  const valorParaBuscar = ({ target }) => {
    setValorDaBusca(target.value);
  };

  const verificarQuantidade = () => {
    if (recipesMeals.length === 1 || recipesDrinks.length === 1) {
      if (pagina === 'Meals') {
        history.push(`/meals/${recipesMeals[0].idMeal}`);
      }
      if (pagina === 'Drinks') {
        history.push(`/drinks/${recipesDrinks[0].idDrink}`);
      }
    }
  };

  const salvarPorQuantidade = () => {
    if (pagina === 'Meals') {
      setImagemReceita('strMealThumb');
      setNomeReceita('strMeal');
    }
    if (pagina === 'Drinks') {
      setImagemReceita('strDrinkThumb');
      setNomeReceita('strDrink');
    }
  };

  const qualTipoDeReceitaBuscar = async () => {
    if (pagina === 'Meals') {
      await buscarAPIReceitasMeals(radioDeBusca, valorDaBusca);
    }
    if (pagina === 'Drinks') {
      await buscarAPIReceitasDrinks(radioDeBusca, valorDaBusca);
    }
  };

  useEffect(verificarQuantidade, [qualTipoDeReceitaBuscar]);
  useEffect(salvarPorQuantidade, [recipesMeals, recipesDrinks]);

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
        onClick={ () => qualTipoDeReceitaBuscar() }
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
