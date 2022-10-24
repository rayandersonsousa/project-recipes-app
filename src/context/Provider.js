import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleInpuEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  // const handleButton = () => {

  // };

  const contexto = useMemo(() => ({
    email,
    handleInpuEmail,
    password,
    handleInputPassword,
  }), [email, password]);

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
