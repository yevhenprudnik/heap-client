import { Link } from 'react-router-dom';
import '../Auth.css';
import { buttonStyle } from '../styles';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/sign-in', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      
      window.location.replace('/');
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return (
    <div className="fontMontserrat shadow-5 pa5 br3">
      <div className="f1 b tc">Login</div>
      <div className="pt4">Email</div>
      <div>
        <input type="email" className="input" />
      </div>
      <div className="pt4">Password</div>
      <div>
        <input type="password" className="input" />
      </div>
      <div className='pt3 tc w-80 center'>
        <div className='mb4 red w5'>
          {!!loginError.length && loginError}
        </div>
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
