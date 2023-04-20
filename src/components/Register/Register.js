import "./Register.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className='register shadow-5'>
      <div className='registerTitle'>Register</div>
      <div className='registerCaption'>Name</div>
      <div>
        <input type='text' className='registerInput' />
      </div>
      <div className='registerCaption'>E-mail</div>
      <div>
        <input type='email' className='registerInput' />
      </div>
      <div className='registerCaption'>Password</div>
      <div>
        <input type='password' className='registerInput' />
      </div>
      <div className='registerCaption'>Confirm password</div>
      <div>
        <input type='password' className='registerInput' />
      </div>
      <div className='registerButtons'>
        <Link to='/' className='registerBtn'>Home</Link> 
        <button className='registerBtn'>Enter</button>
      </div>
    </div>
  );
}
