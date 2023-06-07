import { api } from '../../../api/api';
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
      alert('Passwords mistmatch.');
      return;
    }

    try {
      const response = await api.post(
        'auth/sign-up',
        { username, email, password },
      );

      const { data } = response;

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      window.location.replace('/heap-client/#/posts');
    } catch (e) {
      setRegisterError(e.response.data.message);
    }
  };

  return (
    <div className='fontMontserrat shadow-5 pa5 br3'>
      <div className='f1 b tc'>Register</div>
      <div className='mt4'>Name</div>
      <div>
        <input
          type='text'
          className='input'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mt4'>Email</div>
      <div>
        <input
          type='email'
          className='input'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mt4'>Password</div>
      <div>
        <input
          type='password'
          className='input'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mt4'>Confirm password</div>
      <div>
        <input
          type='password'
          className='input'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className='mt4 tc w-80 center'>
        <div className='mb4 red w5'>
          {!!registerError.length && registerError}
        </div>
        <div className={`no-underline ${buttonStyle}`} onClick={handleRegister}>
          Register
        </div>
      </div>
      <div className='flex ma4'>
        <div className='pa2'>Already have an account?</div>
        <Link to='/login' className='no-underline black dib v-mid'>
          <div className={buttonStyle}>Login</div>
        </Link>
      </div>
    </div>
  );
}
