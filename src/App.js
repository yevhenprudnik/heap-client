import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/Navigation/Navigation';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Auth/Register/RegisterPage';
import LoginPage from './pages/Auth/Login/LoginPage';
import PostsPage from './pages/Posts/PostsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import './App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
      const response = await fetch('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setIsAuthorized(true);
      }
    };
    
    loadUser();
  }, []);

  return (
    <>
      <NavBar isAuthorized={isAuthorized} />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/posts' element={<PostsPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
