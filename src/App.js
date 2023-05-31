import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navigation/Navigation';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Auth/Register/RegisterPage';
import LoginPage from './pages/Auth/Login/LoginPage';
import PostsPage from './pages/Posts/PostsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import { api } from './api/api';
import './App.css';
import { fetchUser } from './store/userSlice';

function App({ getUser, userTest }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get('auth');
        await getUser();

        if (response.statusText === 'OK') {
          setIsAuthorized(true);
        }
      } catch {
        setIsAuthorized(false);
      }
    };

    console.log({ userTest });

    loadUser();
  }, []);

  return (
    <>
      <h1>{JSON.stringify(userTest)}</h1>
      <NavBar isAuthorized={isAuthorized} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </>
  );
}

function mapStateToProps(state) {
  return {
    userTest: state.user.userTest,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
