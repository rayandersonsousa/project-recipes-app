import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setDisable] = useState(true);

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

  const contexto = useMemo(() => ({
    email,
    handleInpuEmail,
    password,
    handleInputPassword,
    isDisable,
    handleDisable,
  }), [email, password, isDisable]);

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
