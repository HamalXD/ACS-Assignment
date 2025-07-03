import React from "react";
import { Navigate } from "react-router-dom";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  currentUser: User | null;
}

function ProtectedRoute({ children, currentUser }: ProtectedRouteProps) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
