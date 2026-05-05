import { useState, useCallback } from "react";
import type { AuthUser } from "@/features/auth/types/auth.types";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
} from "@/features/auth/services/authService";
import type { LoginCredentials } from "@/features/auth/types/auth.types";

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  const login = useCallback((credentials: LoginCredentials): boolean => {
    const result = authLogin(credentials);
    if (result) {
      setUser(result);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };
}
