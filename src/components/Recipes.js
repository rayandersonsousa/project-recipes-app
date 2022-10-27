import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import CardFood from './CardFood';
import AppContext from '../context/AppContext';

function Recipes(props) {
  const { receitasBuscadas } = useContext(AppContext);
  const [receitasIniciais, setReceitasIniciais] = useState([]);
  const [imagemReceita, setImagemReceita] = useState('');
  const [nomeReceita, setNomeReceita] = useState('');
  const [idReceita, setIdReceita] = useState('');
  const [category, setCategory] = useState([]);
  // const [choosenCategory, setChoosenCategory] = useState('All');
  const { pagina } = props;

  useEffect(() => {
    async function buscarReceitasIniciais() {
      const doze = 12;
      const cinco = 5;
      if (pagina === 'meals') {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { meals } = data;
        const dozeReceitas = meals.slice(0, doze);
        const endpointCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const responseCategories = await fetch(endpointCategories);
        const dataCategories = await responseCategories.json();
        const categoriesFull = dataCategories.meals.slice(0, cinco);
        setCategory(categoriesFull);
        setImagemReceita('strMealThumb');
        setNomeReceita('strMeal');
        setIdReceita('idMeal');
        return setReceitasIniciais(dozeReceitas);
      }
      if (pagina === 'drinks') {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { drinks } = data;
        const dozeReceitas = drinks.slice(0, doze);
        const endpointCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const responseCategories = await fetch(endpointCategories);
        const dataCategories = await responseCategories.json();
        const categoriesFull = dataCategories.drinks.slice(0, cinco);
        setCategory(categoriesFull);
        setImagemReceita('strDrinkThumb');
        setNomeReceita('strDrink');
        setIdReceita('idDrink');
        return setReceitasIniciais(dozeReceitas);
      }
    }
    buscarReceitasIniciais();
  }, []);

  const filtrarPorBotão = async ({ target }) => {
    const categoriaEscolhida = target.value;
    const doze = 12;
    if (pagina === 'meals') {
      if (categoriaEscolhida === 'All') {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { meals } = data;
        const dozeReceitas = meals.slice(0, doze);
        return setReceitasIniciais(dozeReceitas);
      }
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaEscolhida}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { meals } = data;
      const dozeReceitas = meals.slice(0, doze);
      return setReceitasIniciais(dozeReceitas);
    }
    if (pagina === 'drinks') {
      if (categoriaEscolhida === 'All') {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { drinks } = data;
        const dozeReceitas = drinks.slice(0, doze);
        return setReceitasIniciais(dozeReceitas);
      }
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoriaEscolhida}`;
      console.log(endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const { drinks } = data;
      const dozeReceitas = drinks.slice(0, doze);
      return setReceitasIniciais(dozeReceitas);
    }
  };

  const receitasProcuradas = (
    <div className="receitasContainer">
      {
        receitasBuscadas.map((cadaReceita, index) => (
          <CardFood
            key={ index }
            pagina={ pagina }
            index={ index }
            name={ cadaReceita[nomeReceita] }
            img={ cadaReceita[imagemReceita] }
          />
        ))
      }
    </div>);

  const receitasSemBusca = (
    <div className="receitasContainer">
      {
        receitasIniciais && receitasIniciais.map((cadaReceita, index) => (
          <CardFood
            key={ index }
            pagina={ pagina }
            index={ index }
            name={ cadaReceita[nomeReceita] }
            img={ cadaReceita[imagemReceita] }
            id={ cadaReceita[idReceita] }
          />
        ))
      }
    </div>);

  return (
    <div>
      <label htmlFor="categories">
        All
        <input
          type="radio"
          data-testid="All-category-filter"
          value="All"
          name="categories"
          onClick={ filtrarPorBotão }
        />
      </label>
      {
        category && category.map(({ strCategory }) => (
          <label htmlFor="categories" key={ strCategory }>
            {strCategory}
            <input
              type="radio"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              name="categories"
              onClick={ filtrarPorBotão }
            />
          </label>
        ))
      }
      <div className="receitasContainer">
        {
          receitasBuscadas.length !== 0 ? receitasProcuradas : receitasSemBusca
        }
      </div>
    </div>
  );
}

Recipes.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default Recipes;
