import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function Login({ history }) {
  const { email, setEmail, password, setPassword, submitDisabled,
    getDataMeals, getDataDrinks } = useContext(Context);

  const handleClickSubmit = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    getDataMeals();
    getDataDrinks();
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        E-mail
        <input
          data-testid="email-input"
          name="email"
          id="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid="password-input"
          name="password"
          id="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ submitDisabled }
        onClick={ handleClickSubmit }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
