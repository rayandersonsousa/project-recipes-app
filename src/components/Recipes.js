import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import CardFood from './CardFood';
import AppContext from '../context/AppContext';

function Recipes(props) {
  const { receitasBuscadas } = useContext(AppContext);
  const [receitasIniciais, setReceitasIniciais] = useState([]);
  const [imagemReceita, setImagemReceita] = useState('');
  const [nomeReceita, setNomeReceita] = useState('');
  const { pagina } = props;

  useEffect(() => {
    async function buscarReceitasIniciais() {
      const doze = 12;
      if (pagina === 'Meals') {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { meals } = data;
        const dozeReceitas = meals.slice(0, doze);
        setImagemReceita('strMealThumb');
        setNomeReceita('strMeal');
        return setReceitasIniciais(dozeReceitas);
      }
      if (pagina === 'Drinks') {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(endpoint);
        const data = await response.json();
        const { drinks } = data;
        const dozeReceitas = drinks.slice(0, doze);
        setImagemReceita('strDrinkThumb');
        setNomeReceita('strDrink');
        return setReceitasIniciais(dozeReceitas);
      }
    }
    buscarReceitasIniciais();
  }, []);

  const receitasProcuradas = (
    <div className="receitasContainer">
      {
        receitasBuscadas.map((cadaReceita, index) => (
          <CardFood
            key={ index }
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
            key={ [cadaReceita, index] }
            index={ index }
            name={ cadaReceita[nomeReceita] }
            img={ cadaReceita[imagemReceita] }
          />
        ))
      }
    </div>);

  return (
    <div className="receitasContainer">
      {
        console.log(receitasBuscadas)
      }
      {
        receitasBuscadas.length !== 0 ? receitasProcuradas : receitasSemBusca
      }
    </div>
  );
}

Recipes.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default Recipes;
