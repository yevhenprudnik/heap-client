import { Link } from 'react-router-dom';

export const nawBarMainLinkStyle =
  'f2 black no-underline bg-animate hover-bg-light-gray pa2 br3';

export const nawBarAuthLinkStyle =
  'f4 black no-underline bg-animate hover-bg-light-gray pa2 br3';

export default function NavBar() {
  return (
    <div className="flex fontMontserrat rowDirection pa3 justify-between items-center bb">
      <div>
        <Link to="/" className={nawBarMainLinkStyle}>
          Home
        </Link>
        <Link to="/posts" className={nawBarMainLinkStyle}>
          Posts
        </Link>
      </div>
      <div>
        <Link to="/login" className={nawBarAuthLinkStyle}>
          Login
        </Link>
        <Link to="/register" className={nawBarAuthLinkStyle}>
          Register
        </Link>
      </div>
    </div>
  );
}
