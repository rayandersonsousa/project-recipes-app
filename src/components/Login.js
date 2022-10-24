import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { handleInpuEmail, handleInputPassword } = useContext(AppContext);
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
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
