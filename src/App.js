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
import { fetchCurrentUser } from './store/userSlice';

function App({ getCurrentUser, currentUser, targetUser }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get('auth');
        await getCurrentUser(response.data.id);
        if (response.statusText === 'OK') {
          setIsAuthorized(true);
        }
      } catch {
        setIsAuthorized(false);
      }
    };

    loadUser();
  }, [getCurrentUser]);

  return (
    <>
      <NavBar isAuthorized={isAuthorized} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
      </Routes>
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.userSlice.currentUser,
    targetUser: state.userSlice.targetUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser: id => dispatch(fetchCurrentUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
