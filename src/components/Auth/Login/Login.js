import { api } from '../../../api/api';
import { Link } from 'react-router-dom';
import { buttonStyle } from '../styles';
import { useState } from 'react';
import '../Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('auth/sign-in', { email, password });

      const data = response.data;

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.replace('/heap-client/#/posts');
    } catch (e) {
      setLoginError(e.response.data.message);
    }
  };

  return (
    <div className="fontMontserrat shadow-5 pa5 br3">
      <div className="f1 b tc">Login</div>
      <div className="pt4">Email</div>
      <div>
        <input
          type="email"
          className="input"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="pt4">Password</div>
      <div>
        <input
          type="password"
          className="input"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="pt3 tc w-80 center">
        <div className="mb4 red w5">{!!loginError.length && loginError}</div>
        <div
          className={`no-underline ${buttonStyle}`}
          onClick={() => handleLogin(email, password)}
        >
          Login
        </div>
      </div>
      <div className="flex pt4">
        <div className="pa2">Don't have an account?</div>
        <Link to="/register" className="no-underline black dib v-mid">
          <div className={buttonStyle}>Register</div>
        </Link>
      </div>
    </div>
  );
}
