import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const nawBarMainLinkStyle =
  'f2 black no-underline bg-animate hover-bg-light-gray pa2 br3';

export const nawBarAuthLinkStyle =
  'f4 black no-underline bg-animate hover-bg-light-gray pa2 br3';

function NavBar({ isAuthorized, currentUser }) {
  return (
    <div className="flex fontMontserrat rowDirection pa3 justify-between items-center bb b--light-gray">
      <div>
        <Link to="/" className={nawBarMainLinkStyle}>
          Home
        </Link>
        <Link to="/posts" className={nawBarMainLinkStyle}>
          Posts
        </Link>
        <Link to={`/profile/${currentUser.id}`} className={nawBarMainLinkStyle}>
          Profile
        </Link>
        <Link to={'/users'} className={nawBarMainLinkStyle}>
          Users
        </Link>
      </div>
      <div>
        {isAuthorized ? (
          <button
            className={nawBarAuthLinkStyle}
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');

              window.location.reload();
            }}
          >
            SignOut
          </button>
        ) : (
          <div>
            <Link to="/login" className={nawBarAuthLinkStyle}>
              Login
            </Link>
            <Link to="/register" className={nawBarAuthLinkStyle}>
              Register
            </Link>
          </div>
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
