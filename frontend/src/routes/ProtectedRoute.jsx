import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { AccessDenied } from "../pages/Error/AccessDenied";

export const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, role } = useAuth();

  // check if the user is authenticated
  if (!isAuthenticated) {
    // if the user isn't authenticated, redirect to the login page
    return <Navigate to={"/login"} />;
  }

  // if the user is authenticated but it's trying to access some resource
  // to which he doesn't have permissions show him an error page
  //! Don't forget, cookies comes in strings
  if (isAuthenticated && !roles.includes(Number(role))) {
    return <AccessDenied />;
  }

  // if it's authenticated, render the child routes
  return <Outlet />;
};
