import React from "react"; // to verify and direct the user using private route
import { Navigate, Outlet } from "react-router-dom"; // to navigate to the desire page after check
import { useAuthStatus } from "../hooks/useAuthStatus"; // bring the hook value to check
import Spinner from "./Spinner";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus(); // initiallizing the values to check

  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

  