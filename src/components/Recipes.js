import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import CardFood from './cardFood';

function Recipes(props) {
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
  }, [pagina]);

  return (
    <div className="receitasContainer">
      {
        receitasIniciais && receitasIniciais.map((cadaReceita, index) => (
          <CardFood
            key={ index }
            index={ index }
            name={ cadaReceita[nomeReceita] }
            img={ cadaReceita[imagemReceita] }
          />
        ))
      }
    </div>
  );
}

Recipes.propTypes = {
  pagina: PropTypes.string,
}.isRequired;

export default Recipes;
