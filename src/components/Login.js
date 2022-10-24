import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login(props) {
  const { handleInpuEmail,
    handleInputPassword, isDisable, saveEmail } = useContext(AppContext);
  const { history } = props;

  const submit = () => {
    saveEmail();
    history.push('/meals');
  };

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
        onClick={ submit }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
