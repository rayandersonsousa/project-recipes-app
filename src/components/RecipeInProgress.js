import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeInProgress(props) {
  const { match: { url } } = props;
  const infosPag = url.split('/');
  const paginaLocal = infosPag[1];
  const idPag = infosPag[2];

  const [receita, setReceita] = useState([]);
  const [categoriaComida, setCategoriaComida] = useState('');
  const [alcoolica, setAlcoolica] = useState('');
  const [paginaAtual, setPaginaAtual] = useState('');
  const [fotoPagina, setFotoPagina] = useState('');
  const [nomeReceita, setNomeReceita] = useState('');

  useEffect(() => {
    async function buscarDados(pagina, id) {
      if (pagina === 'meals') {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        const { meals } = data;
        setCategoriaComida(meals[0].strCategory);
        setPaginaAtual('Meal');
        setFotoPagina('strMealThumb');
        setNomeReceita('strMeal');
        return setReceita(meals[0]);
      }
      if (pagina === 'drinks') {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        const { drinks } = data;
        setAlcoolica(drinks[0].strAlcoholic);
        setCategoriaComida(drinks[0].strCategory);
        setPaginaAtual('Drink');
        setFotoPagina('strDrinkThumb');
        setNomeReceita('strDrink');
        return setReceita(drinks[0]);
      }
    }
    buscarDados(paginaLocal, idPag);
  }, [paginaLocal, idPag]);

  return (
    <div>
      {
        receita && (
          <div>
            <img
              src={ receita[fotoPagina] }
              alt={ `str${paginaAtual}` }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{receita[nomeReceita]}</h1>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
            <h1 data-testid="recipe-category">{categoriaComida}</h1>
            {
              alcoolica && <p>{alcoolica}</p>
            }
            <div>
              <p data-testid="instructions">Instruções</p>
            </div>
            <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
            <h1>oi</h1>
          </div>
        )
      }
    </div>
  );
}

RecipeInProgress.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
