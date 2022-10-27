import PropTypes from 'prop-types';
import React from 'react';

function CardFood(props) {
  const { index, img, name } = props;
  return (
    <section data-testid={ `${index}-recipe-card` } className="cardFood">
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </section>
  );
}

CardFood.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default CardFood;
