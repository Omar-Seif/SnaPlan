import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Authentication";
import type {JSX} from "react"
interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string; 
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, token } = useContext(AuthContext);

  // Not logged in
  if (!token || !user) {
    
    if (requiredRole === "Admin") return <Navigate to="/admin/Login" replace />;
    if (requiredRole === "Organizer") return <Navigate to="/organizer/login" replace />;
    return <Navigate to="/attendee/register" replace />; 
  }

  // Check role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


export default ProtectedRoute;
