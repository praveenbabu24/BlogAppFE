import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  if (isAuth === null) return <p>....Loading</p>;

  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;