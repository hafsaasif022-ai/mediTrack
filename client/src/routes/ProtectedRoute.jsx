import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * TASK 5.6 - Skip the booted flag and every refresh bounces a logged-in
 * patient back to /login for a split second.
 *
 *   if (!booted) return <p>Loading session...</p>;
 *   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
 */
export default function ProtectedRoute() {
  const { isAuthenticated, booted } = useSelector((s) => s.auth);
  // TODO (Task 5.6)
  return <Navigate to="/login" replace />;
}
