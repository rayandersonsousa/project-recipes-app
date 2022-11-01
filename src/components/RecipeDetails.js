import React from 'react';
import PropTypes from 'prop-types';
import DrinksDetails from './DrinksDetails';
import MealsDetails from './MealsDetails';

function RecipeDetails(props) {
//   const [details, setDetails] = useState([]);
  const { match } = props;
  const { params, path } = match;
  const { id } = params;
  const pathstring = path.substring(
    path.indexOf('/') + 1,
    path.lastIndexOf('/'),
  );

  const verificacao = pathstring === 'meals'
    ? <MealsDetails id={ id } />
    : <DrinksDetails id={ id } />;
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
