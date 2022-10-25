import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setDisable] = useState(true);
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const stringErro = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleDisable = () => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMin = 5;
    const emailOk = regex.test(email);
    const passwordOk = password.length > passwordMin;
    const checkData = !(emailOk && passwordOk);
    setDisable(checkData);
  };

  const handleInpuEmail = ({ target }) => {
    setEmail(target.value);
    handleDisable();
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
    handleDisable();
  };

  const saveEmail = () => {
    const userEmail = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(userEmail));
  };

  const buscarAPIReceitasMeals = async (tipoDeBusca, valorDeBusca) => {
    switch (tipoDeBusca) {
    case 'ingredient': {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { meals } = data;
      if (meals === null) {
        return global.alert(stringErro);
      }
      return setRecipesMeals(data);
    }
    case 'name': {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { meals } = data;
      if (meals === null) {
        return global.alert(stringErro);
      }
      return setRecipesMeals(data);
    }
    case 'firstletter': {
      if (valorDeBusca.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { meals } = data;
      if (meals === null) {
        return global.alert(stringErro);
      }
      return setRecipesMeals(data);
    }
    default: {
      return null;
    }
    }
  };

  const buscarAPIReceitasDrinks = async (tipoDeBusca, valorDeBusca) => {
    switch (tipoDeBusca) {
    case 'ingredient': {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { drinks } = data;
      if (drinks === null) {
        return global.alert(stringErro);
      }
      return setRecipesDrinks(data);
    }
    case 'name': {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { drinks } = data;
      if (drinks === null) {
        return global.alert(stringErro);
      }
      return setRecipesDrinks(data);
    }
    case 'firstletter': {
      if (valorDeBusca.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valorDeBusca}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const { drinks } = data;
      if (drinks === null) {
        return global.alert(stringErro);
      }
      return setRecipesDrinks(data);
    }
    default: {
      return null;
    }
    }
  };

  const contexto = useMemo(() => ({
    email,
    handleInpuEmail,
    password,
    handleInputPassword,
    isDisable,
    saveEmail,
    buscarAPIReceitasMeals,
    buscarAPIReceitasDrinks,
  }), [email, password, isDisable, recipesMeals, recipesDrinks]);

  return (
    <AppContext.Provider value={ contexto }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
