import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const AuthAdmin = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  return user && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthAdmin;
