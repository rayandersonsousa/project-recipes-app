import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function MealsDetails(props) {
  const { id } = props;

  const [details, setDetails] = useState({});
  const [drinksList, setDrinksList] = useState([]);
  const [url, setUrl] = useState('');
  const [scrollIndex, setScrollIndex] = useState([0, 1]);
  const [inProgress, setInProgress] = useState();
  const [clickedOnShare, setClickedOnShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState();

  const makeUrl = (link) => link.replace('watch?v=', 'embed/');

  const checkIfIsFavorite = () => {
    console.log('favorite list');
    const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoritesList);
    if (favoritesList === []) {
      setIsFavorite(false);
      return;
    }
    if (isFavorite !== null && favoritesList.length > 0) {
      setIsFavorite(favoritesList.some((e) => e.id === details.idMeal));
    }
  };
  const checkIfHasStarted = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes !== null) {
      console.log(Object.keys(inProgressRecipes.meals).includes(details.idMeal));
      setInProgress(Object.keys(inProgressRecipes.meals).includes(details.idMeal));
    }
  };

  const buscarAPIReceitasDetails = async (valorDeBusca) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${valorDeBusca}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const { meals } = data;
    setUrl(makeUrl(meals[0].strYoutube));
    setDetails(meals[0]);
    checkIfHasStarted();
    checkIfIsFavorite();
  };

  const buscarAPIDrinks = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const data = await response.json();
    const { drinks } = data;
    const LAST_INDEX = 6;
    setDrinksList(drinks.slice(0, LAST_INDEX));
  };

  const fetchInfo = (mealId) => {
    buscarAPIReceitasDetails(mealId);
    buscarAPIDrinks();
  };
  const nextSuggestion = () => {
    const INDEX_3 = 3;
    const INDEX_4 = 4;
    const INDEX_5 = 5;
    if (scrollIndex[0] === 0) {
      setScrollIndex([2, INDEX_3]);
    }
    if (scrollIndex[0] === 2) {
      setScrollIndex([INDEX_4, INDEX_5]);
    }
    if (scrollIndex[0] === INDEX_4) {
      setScrollIndex([0, 1]);
    }
  };
  const resultadoDaReceita = Object.entries(details);
  const arrayIngredientes = resultadoDaReceita
    .filter((cadaChave) => cadaChave[0].includes('ngredient') && cadaChave[1]);
  const startRecipe = () => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {
        },
        meals: {
        },
      }));
    }
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredients = arrayIngredientes.map((e) => e[0]);
    inProgressRecipes.meals[details.idMeal] = ingredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setInProgress(true);
  };

  const handleCopy = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setClickedOnShare(true);
  };

  const addToFavorites = () => {
    const favoriteMealInfo = {
      id: details.idMeal,
      type: details.strCategory,
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: new Date(),
      tags: [details.strTags],
    };
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      console.log('Setou localStorage Vazio');
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (isFavorite === undefined || !isFavorite) {
      console.log('Setou como favorite no local storage');
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteRecipes.push(favoriteMealInfo);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setIsFavorite(true);
      return;
    }
    console.log(isFavorite);
    if (isFavorite) {
      console.log('setou como false');
      setIsFavorite(false);
      const newFavorites = favoriteRecipes.filter((e) => e.id !== details.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return;
    }
    console.log(isFavorite);
  };
  useEffect(() => {
    fetchInfo(id);
  }, [inProgress, isFavorite]);

  const arrayMedidas = resultadoDaReceita
    .filter((cadaChave) => cadaChave[0].includes('Measure') && cadaChave[1]);
  const arrayDeIngredientesEMedidas = [];

  arrayIngredientes.forEach((e, i) => {
    arrayDeIngredientesEMedidas.push([e[1], arrayMedidas[i][1]]);
  });
  return (

    <div className="recipe-details">
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt={ details.strMeal }
      />
      <h1 data-testid="recipe-title">{details.strMeal}</h1>
      <p data-testid="recipe-category">
        {details.strCategory}
      </p>
      {
        arrayDeIngredientesEMedidas.map((e, i) => (
          <p
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ e[0] }
          >
            {`${e[0]} ${e[1]}` }
          </p>
        ))
      }
      <p data-testid="instructions">{details.strInstructions}</p>
      <iframe
        data-testid="video"
        title={ details.strMeal }
        width="420"
        height="315"
        src={ url }
      />
      <button type="button" data-testid="share-btn" onClick={ handleCopy }>
        <img
          src={ shareIcon }
          alt="share-button"
        />
      </button>
      <p style={ { display: clickedOnShare ? '' : 'none' } }>Link copied!</p>
      <button type="button" data-testid="favorite-btn" onClick={ addToFavorites }>
        <img src={ isFavorite ? blackHeart : whiteHeart } alt="favorite logo" />
      </button>
      <p>Recommended</p>
      <div
        className="recommendation-box"
      >
        {drinksList.map((r, i) => (
          <div
            className="recommendation-card"
            data-testid={ `${i}-recommendation-card` }
            key={ i }
            style={ { visibility: scrollIndex.includes(i) ? 'visible' : 'hidden' } }
          >
            <img src={ r.strDrinkThumb } alt={ r.strDrink } />
            <p data-testid={ `${i}-recommendation-title` }>
              { r.strDrink }
            </p>
          </div>
        ))}
        <button type="button" onClick={ nextSuggestion }>next</button>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        style={ { position: 'fixed', display: inProgress ? '' : 'none' } }
        onClick={ startRecipe }
      >
        Continue Recipe
      </button>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        style={ { position: 'fixed', display: inProgress ? 'none' : '' } }
        onClick={ startRecipe }
      >
        Start Recipe
      </button>
    </div>
  );
}

MealsDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealsDetails;
