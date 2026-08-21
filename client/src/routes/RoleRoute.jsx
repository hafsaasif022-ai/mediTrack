import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// TASK 7.6 - Same idea as ProtectedRoute, plus a role check.
export default function RoleRoute({ allow }) {
  const { user, isAuthenticated, booted } = useSelector((s) => s.auth);
  if (!booted) return <p>Loading session...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // TODO (Task 7.6): allow.includes(user.role) ? <Outlet /> : <Navigate to="/forbidden" replace />
  return <Outlet />;
}
