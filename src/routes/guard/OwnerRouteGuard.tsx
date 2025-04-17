import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface OwnerRouteGuardProps {
  children: ReactNode;
}

const OwnerRouteGuard = ({ children }: OwnerRouteGuardProps) => {
  const { role, isInitialized } = useAuth();

  if (!isInitialized) return null;
  if (role !== "OWNER") return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default OwnerRouteGuard;