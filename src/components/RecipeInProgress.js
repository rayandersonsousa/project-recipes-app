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
  // const [ingredientesFeitos, setIngredientesFeitos] = useState([]);
  const [copiado, setCopiado] = useState(false);
  const [marcados, setMarcados] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const arrayDeEscolhidos = [];

  useEffect(() => {
    async function buscarDados(pagina, id) {
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage.setItem('inProgressRecipes', []);
      }
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', []);
      }
      if (pagina === 'meals') {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(endpoint);
        const data = await response.json();
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
    arrayDeEscolhidos.push(target.name);
    localStorage.setItem('inProgressRecipes', [jaSalvos, arrayDeEscolhidos]);
    const todosOsFavoritados = localStorage.getItem('inProgressRecipes');
    const agoraVaiReceitasFavoritadas = todosOsFavoritados.split(',');
    const arrayDefinitivo = agoraVaiReceitasFavoritadas
      .filter((cadaReceita) => cadaReceita.length > 1);
    localStorage.setItem('inProgressRecipes', arrayDefinitivo);
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
        console.log(cadaUm);
        return setMarcados((oldState) => oldState + 1);
      }
      if (marcados !== 0 && marcados === ingredientes.length) {
        setDisabled(false);
      }
    });
  }, [ingredientes]);

  useEffect(() => {
    if (marcados !== 0 && marcados === ingredientes.length) {
      setDisabled(false);
    }
  }, [marcados]);

  const favoritarReceita = (nome) => {
    const pegarReceitasLocalStorage = localStorage.getItem('favoriteRecipes');
    const novasReceitasFavoritadas = pegarReceitasLocalStorage.split(',');
    const listaReceitasFavoritas = novasReceitasFavoritadas
      .filter((cadaReceita) => cadaReceita.length > 1);
    if (listaReceitasFavoritas.includes(nome)) {
      const removerNome = listaReceitasFavoritas
        .filter((cadaFav) => cadaFav !== nome);
      localStorage.setItem('favoriteRecipes', removerNome);
      const todosOsFavoritados = localStorage.getItem('favoriteRecipes');
      const agoraVaiReceitasFavoritadas = todosOsFavoritados.split(',');
      const arrayDefinitivo = agoraVaiReceitasFavoritadas
        .filter((cadaReceita) => cadaReceita.length > 1);
      localStorage.setItem('favoriteRecipes', arrayDefinitivo);
      setfoiFavorito(whiteHeart);
    } else {
      localStorage.setItem('favoriteRecipes', [listaReceitasFavoritas, nome]);
      const todosOsFavoritados = localStorage.getItem('favoriteRecipes');
      const agoraVaiReceitasFavoritadas = todosOsFavoritados.split(',');
      const arrayDefinitivo = agoraVaiReceitasFavoritadas
        .filter((cadaReceita) => cadaReceita.length > 1);
      localStorage.setItem('favoriteRecipes', arrayDefinitivo);
      setfoiFavorito(blackHeart);
    }
  };

  const copiarProClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${paginaLocal}/${idPag}`);
    return setCopiado(true);
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
            <button
              type="button"
              onClick={ copiarProClipBoard }
              data-testid="share-btn"
            >
              Share
            </button>
            {
              copiado && (<p>Link copied!</p>)
            }
            <button
              type="button"
              onClick={ () => favoritarReceita(receita[nomeReceita]) }
            >
              <img
                data-testid="favorite-btn"
                src={ foiFavorito }
                alt="favoritado"
              />
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disabled }
            >
              Finish Recipe
            </button>
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
