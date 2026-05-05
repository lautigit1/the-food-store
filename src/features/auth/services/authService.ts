import type { AuthUser, LoginCredentials } from "../types/auth.types";
import { MOCK_CREDENTIALS, MOCK_USERS } from "../data/authMock";

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
export function login(credentials: LoginCredentials): AuthUser | null {
  const { usernameOrEmail, password } = credentials;
  const expectedPassword = MOCK_CREDENTIALS[usernameOrEmail];

  if (!expectedPassword || expectedPassword !== password) {
    return null;
  }

  const user = MOCK_USERS.find(
    (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
  );

  if (!user) return null;

  const session: StoredSession = {
    user,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return user;
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
