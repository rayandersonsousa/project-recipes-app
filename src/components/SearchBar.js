import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import CardFood from './cardFood';

function SearchBar(props) {
  const { buscarAPIReceitasMeals,
    buscarAPIReceitasDrinks, recipesMeals, recipesDrinks } = useContext(AppContext);
  const [radioDeBusca, setRadioDeBusca] = useState('');
  const [valorDaBusca, setValorDaBusca] = useState('');
  const [receitasBuscadas, setReceitasBuscadas] = useState([]);
  const [imagemReceita, setImagemReceita] = useState('');
  const [nomeReceita, setNomeReceita] = useState('');
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
      // setIdReceita('idMeal');
      const doze = 12;
      if (recipesMeals.length > doze) {
        const dozeReceitas = recipesMeals.slice(0, doze);
        setReceitasBuscadas(dozeReceitas);
      } else {
        setReceitasBuscadas(recipesMeals);
      }
      console.log(receitasBuscadas);
    }
    if (pagina === 'Drinks') {
      setImagemReceita('strDrinkThumb');
      setNomeReceita('strDrink');
      // setIdReceita('idDrink');
      const doze = 12;
      if (recipesDrinks.length > doze) {
        const dozeReceitas = recipesDrinks.slice(0, doze);
        setReceitasBuscadas(dozeReceitas);
      } else {
        setReceitasBuscadas(recipesDrinks);
      }
      console.log(receitasBuscadas);
    }
  };

  const qualTipoDeReceitaBuscar = async () => {
    if (pagina === 'Meals') {
      await buscarAPIReceitasMeals(radioDeBusca, valorDaBusca);
      return setReceitasBuscadas(recipesMeals);
    }
    if (pagina === 'Drinks') {
      await buscarAPIReceitasDrinks(radioDeBusca, valorDaBusca);
      return setReceitasBuscadas(recipesDrinks);
    }
  };

  // const mostrarDetalhes = (id) => {
  //   if (pagina === 'Meals') {
  //     return history.push(`/meals/${id}`);
  //   }
  //   if (pagina === 'Drinks') {
  //     return history.push(`/drinks/${id}`);
  //   }
  // };

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
      <div>
        {
          receitasBuscadas && receitasBuscadas.map((cadaReceita, index) => (
            <CardFood
              key={ index }
              index={ index }
              name={ cadaReceita[nomeReceita] }
              img={ cadaReceita[imagemReceita] }
            />
          ))
        }
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default SearchBar;
