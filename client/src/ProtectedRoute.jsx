import {useContext,React} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>; // Show loading spinner

  if (!isLoggedIn) return <Navigate to="/login" />; // Redirect if not logged in

  return children; // Render the protected component
};

export default ProtectedRoute;
