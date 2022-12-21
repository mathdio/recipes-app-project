import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './Login.css';
import logo from '../images/default_transparent_1000x1000.png';

function Login({ history }) {
  const { email, setEmail,
    password, setPassword, submitDisabled,
    invalidEmail, invalidPassword } = useContext(Context);

  const handleClickSubmit = () => {
    localStorage.setItem('user', email);
    history.push('/meals');
  };

  return (
    <main className="Login__main-container">
      <div className="Login__logo-container">
        <img
          src={ logo }
          alt="logo"
          className="logo-login"
        />
      </div>
      <div className="Login__form-container">
        <form className="Login__form">
          <label htmlFor="email" className="Login__label-container">
            E-mail
            <input
              type="text"
              className="input"
              data-testid="email-input"
              name="email"
              id="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
            {invalidEmail
          && <p className="Login__form-warning">E-mail&apos;s format must be valid.</p>}
          </label>
          <label htmlFor="password" className="Login__label-container">
            Senha
            <input
              type="password"
              data-testid="password-input"
              name="password"
              id="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
            {invalidPassword && (
              <p className="Login__form-warning">
                Password must have at least 7 characters.
              </p>)}
          </label>
          <button
            className="Login__button"
            type="button"
            data-testid="login-submit-btn"
            disabled={ submitDisabled }
            onClick={ handleClickSubmit }
          >
            Enter
          </button>
        </form>
      </div>

    </main>
  );
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
