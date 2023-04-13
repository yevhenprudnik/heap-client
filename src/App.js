import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Posts from './pages/Posts'
import NavBar from './components/Navigation/Navigation'
import './App.css';

function App() {
    return (
        <>
            <header>
                <NavBar/>
            </header>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/posts' element={<Posts />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </>
    );
}

export default App;
