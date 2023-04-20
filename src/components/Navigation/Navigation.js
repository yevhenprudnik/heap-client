import { Link } from 'react-router-dom'
import './Navigation.css';


export default function NavBar() {
    return (
        <div className = 'navigationBar'>
            <div>
                <Link to = "/" className = 'navBarMainLinks'>Home</Link>
                <Link to = "/posts" className = 'navBarMainLinks'>Posts</Link>
            </div>
            <div>
                <Link to = "/login" className = 'navBarAuthLinks'>Login</Link>   
                <Link to = "/register" className = 'navBarAuthLinks'>Register</Link>
            </div>
        </div>
    );
}