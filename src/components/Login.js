import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { handleInpuEmail, handleInputPassword, isDisable } = useContext(AppContext);
  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        onChange={ handleInpuEmail }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ handleInputPassword }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisable }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
