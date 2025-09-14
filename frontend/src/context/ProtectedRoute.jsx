import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks/userAuth";

const ProtectedRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // you can replace with a spinner
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // renders the child route (your protected page)
};

export default ProtectedRoute;
