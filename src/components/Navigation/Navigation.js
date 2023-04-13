import { Link } from 'react-router-dom'
import './Navigation.css';


export default function NavBar() {
    return (
        <div className = 'buttons'>
            <div>
                <Link to = "/" className = 'homeLink'>Home</Link>
                <Link to = "/posts" className = 'postsLink'>Posts</Link>
            </div>
            <div className='logRegButtons'>
                <Link to = "/login" className = 'loginLink'>Login</Link>   
                <Link to = "/register" className = 'registerLink'>Register</Link>
            </div>
        </div>
    );
}