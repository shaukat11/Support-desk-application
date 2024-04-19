import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; // Bringing icons from react-icons
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onlogout}>
              <FaSignOutAlt /> Logout{" "}
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
