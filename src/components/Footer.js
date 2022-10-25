import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const styleDiv = {
    position: 'fixed',
    bottom: '0',
  };
  const history = useHistory();

  const mealPage = () => {
    history.push('/meals');
  };

  const drinkPage = () => {
    history.push('/drinks');
  };

  return (
    <div
      data-testid="footer"
      style={ styleDiv }
    >
      <buttton
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ drinkPage }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </buttton>
      <buttton
        type="button"
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        onClick={ mealPage }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </buttton>
    </div>
  );
}

export default Footer;
