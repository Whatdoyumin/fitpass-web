// src/routes/guard/RoleRouteGuard.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { role, isInitialized } = useAuth();
  const { pathname } = useLocation();

  if (!isInitialized) return null;

  if (role === "OWNER" && !pathname.startsWith("/owner")) {
    return <Navigate to="/owner" replace />;
  }

  if (role === "ADMIN" && !pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  if (role === "MEMBER" && (pathname.startsWith("/owner") || pathname.startsWith("/admin"))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRouteGuard;
