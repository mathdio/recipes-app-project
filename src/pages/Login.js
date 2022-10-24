import React, { useContext } from 'react';
import Context from '../context/Context';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(Context);
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
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
