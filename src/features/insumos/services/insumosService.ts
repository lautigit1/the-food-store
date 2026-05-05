import type { Insumo, InsumoFormData } from "../types/insumo.types";
import { INSUMOS_INICIALES } from "../data/insumosMock";
import { todayISO } from "@/utils/dateUtils";

const STORAGE_KEY = "the_food_store_insumos";

function cargarDesdeStorage(): Insumo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Insumo[];
  } catch {
    // fall through
  }
  // Primera vez: cargar mock y persistir
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INSUMOS_INICIALES));
  return INSUMOS_INICIALES;
}

function guardarEnStorage(insumos: Insumo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(insumos));
}

function generarId(insumos: Insumo[]): number {
  if (insumos.length === 0) return 1;
  return Math.max(...insumos.map((i) => i.id)) + 1;
}

// ─── API pública ──────────────────────────────────────────────────────────────

export function getInsumos(): Insumo[] {
  return cargarDesdeStorage();
}

export function getInsumoById(id: number): Insumo | undefined {
  return cargarDesdeStorage().find((i) => i.id === id);
}

export function createInsumo(data: InsumoFormData): Insumo {
  const insumos = cargarDesdeStorage();
  const nuevo: Insumo = {
    ...data,
    id: generarId(insumos),
    fechaAlta: todayISO(),
  };
  const actualizado = [...insumos, nuevo];
  guardarEnStorage(actualizado);
  return nuevo;
}

export function updateInsumo(id: number, data: InsumoFormData): Insumo | null {
  const insumos = cargarDesdeStorage();
  const index = insumos.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const actualizado: Insumo = {
    ...insumos[index],
    ...data,
    id,
  };
  insumos[index] = actualizado;
  guardarEnStorage(insumos);
  return actualizado;
}

export function deleteInsumo(id: number): boolean {
  return bajaLogicaInsumo(id);
}

/** Baja LÓGICA: cambia estado a "Inactivo" sin eliminar el registro. */
export function bajaLogicaInsumo(id: number): boolean {
  const insumos = cargarDesdeStorage();
  const index = insumos.findIndex((i) => i.id === id);
  if (index === -1) return false;
  insumos[index] = { ...insumos[index], estado: "Inactivo" };
  guardarEnStorage(insumos);
  return true;
}

/** Reactiva un insumo dado de baja lógica. */
export function reactivarInsumo(id: number): boolean {
  const insumos = cargarDesdeStorage();
  const index = insumos.findIndex((i) => i.id === id);
  if (index === -1) return false;
  insumos[index] = { ...insumos[index], estado: "Activo" };
  guardarEnStorage(insumos);
  return true;
}

/**
 * Resetea los insumos al estado inicial (mock).
 * Útil para desarrollo/demo.
 */
export function resetInsumosMock(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INSUMOS_INICIALES));
}
