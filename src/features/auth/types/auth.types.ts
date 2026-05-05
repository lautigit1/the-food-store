export interface AuthUser {
  id: number;
  username: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  nombre: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
