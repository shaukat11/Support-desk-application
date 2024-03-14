import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; // Bringing icons from react-icons
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignOutAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/Register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
