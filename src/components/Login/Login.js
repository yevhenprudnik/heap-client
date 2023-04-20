import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className='login shadow-5'>
      <div className='loginTitle'>Login</div>
      <div className='loginCaption'>E-mail</div>
      <div>
        <input type='email' className='loginInput' />
      </div>
      <div className='loginCaption'>Password</div>
      <div>
        <input type='password' className='loginInput' />
      </div>
      <div className='loginButtons'>
        <Link to='/' className='loginBtn'>Home</Link> 
        <button className='loginBtn'>Enter</button>
      </div>
    </div>
  );
}
