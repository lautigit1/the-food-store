import type { AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth.types";


const STORAGE_KEY = "the_food_store_session";
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutos

interface StoredSession {
  user: AuthUser;
  expiresAt: number; // timestamp Unix (ms)
}

// ─── Helpers internos ────────────────────────────────────────────────────────

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

function isSessionExpired(session: StoredSession): boolean {
  return Date.now() > session.expiresAt;
}

function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Intenta iniciar sesión. Almacena la sesión con timestamp de expiración.
 * Retorna el usuario si las credenciales son válidas, null si no.
 */
import { fetchApi } from "@/shared/api/apiClient";

export async function login(credentials: LoginCredentials): Promise<AuthUser | null> {
  try {
    const response = await fetchApi<{ success: boolean; message: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });

    if (response.success && response.user) {
      const session: StoredSession = {
        user: response.user,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return response.user;
    }
    return null;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function register(credentials: RegisterCredentials): Promise<AuthUser | null> {
  try {
    const user = await fetchApi<AuthUser>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    
    if (user && user.id) {
        // Log in the user right after registration
        const session: StoredSession = {
            user: user,
            expiresAt: Date.now() + SESSION_DURATION_MS,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        return user;
    }
    return null;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
}

/**
 * Cierra la sesión eliminando el almacenamiento.
 */
export function logout(): void {
  clearSession();
}

/**
 * Retorna el usuario actual si la sesión existe y NO ha expirado.
 * Si expiró, elimina automáticamente la sesión y retorna null.
 */
export function getCurrentUser(): AuthUser | null {
  const session = loadSession();
  if (!session) return null;

  if (isSessionExpired(session)) {
    clearSession();
    return null;
  }

  return session.user;
}

/**
 * Retorna true si hay una sesión activa y no expirada.
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Retorna los segundos restantes de la sesión actual, o 0 si no hay sesión.
 */
export function getSessionRemainingMs(): number {
  const session = loadSession();
  if (!session || isSessionExpired(session)) return 0;
  return session.expiresAt - Date.now();
}

/**
 * Extiende la sesión por otros 30 minutos desde ahora (renovación de token).
 */
export function renewSession(): void {
  const session = loadSession();
  if (!session || isSessionExpired(session)) return;
  session.expiresAt = Date.now() + SESSION_DURATION_MS;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
