import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as HomeSvg } from '../../svg/home.svg';
import { ReactComponent as PostsSvg } from '../../svg/posts.svg';
import { ReactComponent as ProfileSvg } from '../../svg/profile.svg';
import { ReactComponent as UsersSvg } from '../../svg/users.svg';
import { ReactComponent as SignOutSvg } from '../../svg/sign_out.svg';
import { ReactComponent as SignInSvg } from '../../svg/login.svg';
import { ReactComponent as SignUpSvg } from '../../svg/register.svg';
import './Navigation.css';

function NavBar({ isAuthorized, currentUser }) {
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    window.location.reload();
  }

  const location = useLocation().pathname;

  return (
    <div className='flex fontMontserrat rowDirection pa3 justify-center items-center bb b--light-gray'>
      <div className='flex-ns'>
        <Link
          className={
            location === '/' ? 'navigation-link-now' : 'navigation-link'
          }
          to='/'
        >
          <HomeSvg />
          <div>Home</div>
        </Link>
        {isAuthorized && (
          <Link
            className={
              location === '/posts' ? 'navigation-link-now' : 'navigation-link'
            }
            to='/posts'
          >
            <PostsSvg />
            <div>Posts</div>
          </Link>
        )}
        {isAuthorized && (
          <Link
            className={
              location === `/profile/${currentUser.id}`
                ? 'navigation-link-now'
                : 'navigation-link'
            }
            to={`/profile/${currentUser.id}`}
          >
            <ProfileSvg />
            <div>Profile</div>
          </Link>
        )}
        {isAuthorized && (
          <Link
            className={
              location === '/users' ? 'navigation-link-now' : 'navigation-link'
            }
            to='/users'
          >
            <UsersSvg />
            <div>Users</div>
          </Link>
        )}
        {isAuthorized && (
          <div className='navigation-link'>
            <SignOutSvg onClick={logout} />
            <div>Logout</div>
          </div>
        )}
        {!isAuthorized && (
          <Link
            className={
              location === '/login' ? 'navigation-link-now' : 'navigation-link'
            }
            to='/login'
          >
            <SignInSvg />
            <div>Login</div>
          </Link>
        )}
        {!isAuthorized && (
          <Link
            className={
              location === '/register'
                ? 'navigation-link-now'
                : 'navigation-link'
            }
            to='/register'
          >
            <SignUpSvg />
            <div>Register</div>
          </Link>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.userSlice.currentUser,
  };
}

export default connect(mapStateToProps)(NavBar);
