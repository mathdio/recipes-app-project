import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import './Login.css';
import logo from '../images/default_transparent_1000x1000.png';

function Login({ history }) {
  const { email, setEmail, password, setPassword, submitDisabled } = useContext(Context);

  const handleClickSubmit = async () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="box">
      <div className="container">
        <span className="span-container"> </span>
        <img
          src={ logo }
          alt="logo"
          className="logo-login"
        />
        <form className="form">
          {/* <label htmlFor="email" className="input__box">
            E-mail
            <input
              data-testid="email-input"
              name="email"
              id="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label> */}
          <input
            data-testid="email-input"
            placeholder="E-mail"
            className="input__box"
            name="email"
            id="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
          {/* <label htmlFor="password" className="input__box">
            Senha
            <input
              data-testid="password-input"
              name="password"
              id="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label> */}
          <input
            data-testid="password-input"
            placeholder="Password"
            className="input__box"
            name="password"
            id="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            className="login__button"
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
