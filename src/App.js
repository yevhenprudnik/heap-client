import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Auth/Register/RegisterPage';
import LoginPage from './pages/Auth/Login/LoginPage';
import PostsPage from './pages/Posts/PostsPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
