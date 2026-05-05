import type { AuthUser } from "../types/auth.types";

export const MOCK_USERS: AuthUser[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@thefoodstore.com",
    nombre: "Administrador",
    rol: "Encargado de inventario",
  },
];

export const MOCK_CREDENTIALS: Record<string, string> = {
  admin: "admin123",
  "admin@thefoodstore.com": "admin123",
};
