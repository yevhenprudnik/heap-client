import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
    return (
        <>
            <header>
                <Link to = "/">Home</Link>
                <br/><br/>
                <Link to = "/posts">Posts</Link>
                <br/><br/>
                <Link to = "/register">Register</Link>
                <br/><br/>
                <Link to = "/login">Login</Link>
                <br/><br/>
            </header>

            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/posts' element={<Posts/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>

            </Routes>
        </>

    );
}

export default App;
