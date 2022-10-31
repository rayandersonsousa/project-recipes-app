import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function CardFavorites(props) {
  const { image, category, name, index, id, nationality, type, drink } = props;
  const { setLocal } = useContext(AppContext);

  const handleFavorite = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtered = localFavorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setLocal(filtered);
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  };

  return (
    <div>
      <Link
        to={ `/${type}s/${id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </h3>
      </Link>
      {
        (type === 'meal')
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${nationality} - ${category}` }
            </p>)
          : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { drink }
            </p>)
      }
      {
        (isCopied) && <p>Link copied!</p>
      }
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeart }
        onClick={ handleFavorite }
      >
        <img src={ blackHeart } alt="favorite" />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ handleClick }
      >
        <img src={ shareIcon } alt="share" />
      </button>
    </div>
  );
}

CardFavorites.propTypes = {
  category: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default CardFavorites;
