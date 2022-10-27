import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function DrinksDetails(props) {
  const { id } = props;

  const [details, setDetails] = useState({});

  const buscarAPIReceitasDetails = async (valorDeBusca) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${valorDeBusca}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const { drinks } = data;
    return setDetails(drinks[0]);
  };

  useEffect(() => {
    buscarAPIReceitasDetails(id);
  }, []);

  console.log(details);
  return (

    <div>

      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h1 data-testid="recipe-title">{details.strDrink}</h1>
      <p data-testid="recipe-category">
        {details.strAlcoholic}
      </p>

      {/* const resultadoDaReceita = Object.entries(receita);
    const arrayIngredientes = resultadoDaReceita
      .filter((cadaChave) => cadaChave[0].includes('ngredient') && cadaChave[1]); */}

    </div>
  );
}

DrinksDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinksDetails;
