import { Link } from 'react-router-dom';
import '../Auth.css';
import { buttonStyle } from '../styles';
import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('не підходять сука паролі');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/sign-up', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(error.message);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);

      window.location.replace('/');
    } catch (e) {
      setRegisterError(e.message);
    }
  };
  return (
    <div className="fontMontserrat shadow-5 pa5 br3">
      <div className="f1 b tc">Register</div>
      <div className="pt4">Name</div>
      <div>
        <input type="text" className="input" />
      </div>
      <div className="pt4">Email</div>
      <div>
        <input type="email" className="input" />
      </div>
      <div className="pt4">Password</div>
      <div>
        <input type="password" className="input" />
      </div>
      <div className="pt4">Confirm password</div>
      <div>
        <input type="password" className="input" />
      </div>
      <div className='mt4 tc w-80 center'>
        <div className='mb4 red w5'>
          {!!registerError.length && registerError}
        </div>
        <div className={`no-underline ${buttonStyle}`} onClick={handleRegister}>
          Register
        </div>
      </div>
      <div className="flex pt4">
        <div className="pa2">Already have an account?</div>
        <Link to="/login" className="no-underline black dib v-mid">
          <div className={buttonStyle}>Login</div>
        </Link>
      </div>
    </div>
  );
}
