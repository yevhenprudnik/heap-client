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
      <div className="flex-ns justify-between pt4">
        <Link to="/" className="no-underline black">
          <div className={buttonStyle}>Home</div>
        </Link>
        <div className={`no-underline ${buttonStyle}`}>Enter</div>
      </div>
    </div>
  );
}
