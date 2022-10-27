import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import DrinksDetails from './DrinksDetails';

function RecipeDetails(props) {
//   const [details, setDetails] = useState([]);
  const { match } = props;
  const { params, path } = match;
  const { id } = params;
  const pathstring = path.substring(
    path.indexOf('/') + 1,
    path.lastIndexOf('/'),
  );

  const verificacao = pathstring === 'meals' ? '' : <DrinksDetails id={ id } />;
  return (
    <div>
      { verificacao }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
  }).isRequired,

};

export default RecipeDetails;
