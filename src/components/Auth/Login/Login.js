import { Link } from 'react-router-dom';
import '../Auth.css';
import { buttonStyle } from '../styles';

export default function Login() {
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
      <div className="pt3 tc w-80 center">
        <div className={`no-underline ${buttonStyle}`}>Login</div>
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
