import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { isAuthenticated } from "@/features/auth/services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Guard de rutas privadas.
 * Si no hay sesión activa, redirige a /login.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
