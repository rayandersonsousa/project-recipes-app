import React, { useContext, useEffect } from 'react';
import Header from './Header';
import CardFavorites from './CardFavorites';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const { local, setLocal } = useContext(AppContext);

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  function handleFilter(type) {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'all') {
      return localFavorites;
    }
    const filtered = localFavorites.filter((recipe) => recipe.type === type);
    return filtered;
  }

  return (
    <div>
      <Header titulo="Favorite Recipes" pesquisa="false" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          src={ mealIcon }
          onClick={ () => { setLocal(handleFilter('all')); } }
        >
          <img src={ mealIcon } alt="all" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          src={ mealIcon }
          onClick={ () => { setLocal(handleFilter('meal')); } }
        >
          <img src={ mealIcon } alt="meals" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          src={ drinkIcon }
          onClick={ () => { setLocal(handleFilter('drink')); } }
        >
          <img src={ drinkIcon } alt="drinks" />
        </button>
      </div>
      {
        local !== null && (local.map((favorite, index) => (
          <CardFavorites
            key={ index }
            image={ favorite.image }
            category={ favorite.category }
            name={ favorite.name }
            index={ index }
            nationality={ favorite.nationality }
            type={ favorite.type }
            drink={ favorite.alcoholicOrNot }
            id={ favorite.id }
          />
        ))
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
