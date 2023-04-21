import { Link } from 'react-router-dom';
import '../Auth.css';
import { buttonStyle } from '../styles';

export default function Login() {
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
      <div className="pt3 tc w-80 center">
        <div className={`no-underline ${buttonStyle}`}>Register</div>
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
