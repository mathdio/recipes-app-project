import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './Login.css';

function Login({ history }) {
  const { email, setEmail, password, setPassword, submitDisabled } = useContext(Context);

  const handleClickSubmit = async () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="box">
      <div className="container">
        <form className="form">
          <label htmlFor="email" className="input__box">
            E-mail
            <input
              data-testid="email-input"
              name="email"
              id="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="password" className="input__box">
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
            className="input__box"
            type="button"
            data-testid="login-submit-btn"
            disabled={ submitDisabled }
            onClick={ handleClickSubmit }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
