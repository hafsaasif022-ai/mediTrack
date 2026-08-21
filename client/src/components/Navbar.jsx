import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// TODO (Task 5.7): import { logoutUser } from "../features/auth/authSlice";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * TASK 5.7 - Logout must hit the server FIRST.
   * Clearing Redux alone leaves the HttpOnly cookie in place, and the next
   * refresh silently logs the user back in.
   */
  const handleLogout = async () => {
    // TODO (Task 5.7): await dispatch(logoutUser()); then navigate("/login");
  };

  return (
    <nav className="nav">
      <Link className="brand" to="/">MediTrack</Link>
      <div className="spacer" />
      {isAuthenticated ? (
        <>
          <Link to="/dashboard">My appointments</Link>
          {user?.role === "staff" && <Link to="/staff">Clinic schedule</Link>}
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
