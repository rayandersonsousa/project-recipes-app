import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardFood(props) {
  const { index, img, name, pagina, id } = props;
  return (
    <Link
      to={ `/${pagina}/${id}` }
      key={ index }
      className="cardFood"
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </Link>
  );
}

CardFood.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default CardFood;
