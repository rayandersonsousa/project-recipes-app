import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RecipeInProgress(props) {
  const { match: { url } } = props;
  const infosPag = url.split('/');
  const paginaLocal = infosPag[1];
  const idPag = infosPag[2];
  const [receita, setReceita] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [categoriaComida, setCategoriaComida] = useState('');
  const [alcoolica, setAlcoolica] = useState('');
  const [paginaAtual, setPaginaAtual] = useState('');
  const [fotoPagina, setFotoPagina] = useState('');
  const [nomeReceita, setNomeReceita] = useState('');
  const [foiFavorito, setfoiFavorito] = useState(whiteHeart);
  const [copiado, setCopiado] = useState(false);
  const [marcados, setMarcados] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const arrayChosen = [];

  useEffect(() => {
    async function buscarDados(pagina, id) {
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage.setItem('inProgressRecipes', []);
      }
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', []);
      }
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', []);
      }
      if (pagina === 'meals') {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endpoint);
        const { meals } = await response.json();
        setCategoriaComida(meals[0].strCategory);
        setPaginaAtual('Meal');
        setFotoPagina('strMealThumb');
        setNomeReceita('strMeal');
        return setReceita(meals[0]);
      }
      if (pagina === 'drinks') {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endpoint);
        const { drinks } = await response.json();
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
  useEffect(() => {
    const resultadoDaReceita = Object.entries(receita);
    const arrayIngredientes = resultadoDaReceita
      .filter((cadaChave) => cadaChave[0].includes('ngredient') && cadaChave[1]);
    const arrayIngredientesFiltrados = arrayIngredientes
      .map((cadaIng) => cadaIng[1]);
    setIngredientes(arrayIngredientesFiltrados);
  }, [receita]);
  useEffect(() => {
    const favoritados = localStorage.getItem('favoriteRecipes');
    const nameRecipe = receita[nomeReceita];
    if (favoritados.includes(nameRecipe)) {
      return setfoiFavorito(blackHeart);
    }
    return setfoiFavorito(whiteHeart);
  }, [nomeReceita, foiFavorito]);
  const riscarSelecionado = ({ target }) => {
    const label = target.parentNode;
    const jaSalvos = localStorage.getItem('inProgressRecipes');
    arrayChosen.push(target.name);
    localStorage.setItem('inProgressRecipes', [jaSalvos, arrayChosen]);
    if (label.classList.contains('riscarPalavra')) {
      label.classList.remove('riscarPalavra');
      target.checked = false;
    } else {
      label.classList.add('riscarPalavra');
      target.checked = true;
      setMarcados((oldState) => oldState + 1);
    }
  };
  useEffect(() => {
    const jaSalvos = localStorage.getItem('inProgressRecipes');
    const novoArray = jaSalvos.split(',');
    novoArray.forEach((cadaUm) => {
      if (ingredientes.includes(cadaUm)) {
        return setMarcados((oldState) => oldState + 1);
      }
      if (marcados !== 0 && marcados >= ingredientes.length) {
        setDisabled(false);
      }
    });
  }, [ingredientes]);
  useEffect(() => {
    if (marcados !== 0 && marcados >= ingredientes.length) {
      setDisabled(false);
    }
  }, [marcados]);
  const favReceita = (nome) => {
    const pegarReceitas = localStorage.getItem('favoriteRecipes');
    const receitaFav = [{
      id: idPag,
      type: paginaAtual === 'Meal' ? 'meal' : 'drink',
      nationality: receita.strArea || '',
      category: receita.strCategory,
      alcoholicOrNot: alcoolica,
      name: receita[nomeReceita],
      image: receita[fotoPagina],
    }];
    console.log(pegarReceitas.length);

    if (pegarReceitas.length > 0) {
      const arrayDePegos = JSON.parse(pegarReceitas);
      const final = arrayDePegos.map((cadaReceita) => {
        if (cadaReceita.name === nome) {
          const removerNome = arrayDePegos
            .filter((cadaFav) => cadaFav.name !== nome);
          console.log(removerNome);
          localStorage.setItem('favoriteRecipes', removerNome);
          console.log('nao foi');
          return setfoiFavorito(whiteHeart);
        }
        localStorage
          .setItem(
            'favoriteRecipes',
            [JSON.stringify(arrayDePegos), JSON.stringify(receitaFav)],
          );
        console.log('foi');
        return setfoiFavorito(blackHeart);
      });
      return final;
    }
    localStorage.setItem('favoriteRecipes', [JSON.stringify(receitaFav)]);
    console.log('foi aqui');
    return setfoiFavorito(blackHeart);
  };
  const copiarProClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${paginaLocal}/${idPag}`);
    return setCopiado(true);
  };
  const salvarEMudarDePag = () => {
    const jaSalvos = localStorage.getItem('doneRecipes');
    const date = new Date();
    const favoriteRecipes = [{
      id: idPag,
      type: paginaAtual === 'Meal' ? 'meal' : 'drink',
      nationality: receita.strArea || '',
      category: receita.strCategory,
      alcoholicOrNot: alcoolica,
      name: receita[nomeReceita],
      image: receita[fotoPagina],
      doneDate: date,
      tags: receita.strTags === null ? [] : receita.strTags.split(','),
    }];
    if (jaSalvos.length === 0) {
      localStorage.setItem('doneRecipes', [JSON.stringify(favoriteRecipes)]);
    } else {
      localStorage.setItem('doneRecipes', [jaSalvos, JSON.stringify(favoriteRecipes)]);
    }
    const { history } = props;
    history.push('/done-recipes');
  };

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
            <h1 data-testid="recipe-category">{categoriaComida}</h1>
            {
              alcoolica && <p>{alcoolica}</p>
            }
            <div>
              <p data-testid="instructions">Instruções</p>
            </div>
            {
              ingredientes && ingredientes.map(
                (cadaUm, index) => (
                  <label
                    htmlFor={ cadaUm }
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    className={ (localStorage
                      .getItem('inProgressRecipes').includes(cadaUm))
                      ? 'riscarPalavra' : null }
                  >
                    {cadaUm}
                    {
                      localStorage.getItem('inProgressRecipes')
                        .includes(cadaUm) ? (
                          <input
                            type="checkbox"
                            name={ cadaUm }
                            onChange={ riscarSelecionado }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            name={ cadaUm }
                            onChange={ riscarSelecionado }
                          />
                        )
                    }
                  </label>
                ),
              )
            }
            <button type="button" onClick={ copiarProClipBoard } data-testid="share-btn">
              Share
            </button>
            { copiado && (<p>Link copied!</p>) }
            <button type="button" onClick={ () => favReceita(receita[nomeReceita]) }>
              <img data-testid="favorite-btn" src={ foiFavorito } alt="favoritado" />
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disabled }
              onClick={ salvarEMudarDePag }
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}

RecipeInProgress.propTypes = { url: PropTypes.string }.isRequired;

export default RecipeInProgress;