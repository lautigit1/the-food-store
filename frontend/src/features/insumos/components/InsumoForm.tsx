import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Insumo, InsumoFormData } from "../types/insumo.types";
import { CATEGORIAS_INSUMO, UNIDADES_MEDIDA } from "../types/insumo.types";

interface InsumoFormProps {
  open: boolean;
  insumo?: Insumo | null;
  onClose: () => void;
  onSave: (data: InsumoFormData) => void;
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="text-[11px] tracking-wider text-[#F8F8F8]/45 uppercase font-mono">
      {children}{" "}
      {required && <span className="text-[#FF5A00]">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-[#C1121F] mt-1">{message}</p>;
}

const inputClass =
  "w-full bg-[#0B0B0B] border border-[#F8F8F8]/10 rounded-lg px-3 py-2 text-sm text-[#F8F8F8] placeholder:text-[#F8F8F8]/20 outline-none focus:border-[#FF5A00]/50 focus:ring-1 focus:ring-[#FF5A00]/25 transition-all h-9";

const selectTriggerClass =
  "bg-[#0B0B0B] border border-[#F8F8F8]/10 text-[#F8F8F8] h-9 text-sm focus:ring-[#FF5A00]/50 rounded-lg";

const selectContentClass = "bg-[#111111] border-[#F8F8F8]/10 text-[#F8F8F8]";

export function InsumoForm({ open, insumo, onClose, onSave }: InsumoFormProps) {
  const isEditing = !!insumo;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsumoFormData>({
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoria: "",
      unidadMedida: "",
      stockActual: 0,
      stockMinimo: 0,
      precioUnitario: 0,
      estado: "Activo",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        insumo
          ? {
              nombre: insumo.nombre,
              descripcion: insumo.descripcion,
              categoria: insumo.categoria,
              unidadMedida: insumo.unidadMedida,
              stockActual: insumo.stockActual,
              stockMinimo: insumo.stockMinimo,
              precioUnitario: insumo.precioUnitario,
              estado: insumo.estado,
            }
          : {
              nombre: "",
              descripcion: "",
              categoria: "",
              unidadMedida: "",
              stockActual: 0,
              stockMinimo: 0,
              precioUnitario: 0,
              estado: "Activo",
            }
      );
    }
  }, [open, insumo, reset]);

  const onSubmit = (data: InsumoFormData) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-[#111111] border-[#F8F8F8]/10 text-[#F8F8F8] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#F8F8F8] text-lg">
            {isEditing ? "Editar insumo" : "Nuevo insumo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          {/* Nombre */}
          <div className="space-y-1.5">
            <FieldLabel required>Nombre</FieldLabel>
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Ej: Harina 000"
                  className={inputClass}
                />
              )}
            />
            <FieldError message={errors.nombre?.message} />
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <FieldLabel>Descripción</FieldLabel>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Descripción del insumo"
                  className={inputClass}
                />
              )}
            />
          </div>

          {/* Categoría + Unidad */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <FieldLabel required>Categoría</FieldLabel>
              <Controller
                name="categoria"
                control={control}
                rules={{ required: "La categoría es obligatoria" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {CATEGORIAS_INSUMO.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-sm">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.categoria?.message} />
            </div>

            <div className="space-y-1.5">
              <FieldLabel required>Unidad de medida</FieldLabel>
              <Controller
                name="unidadMedida"
                control={control}
                rules={{ required: "La unidad es obligatoria" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {UNIDADES_MEDIDA.map((u) => (
                        <SelectItem key={u} value={u} className="text-sm">
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.unidadMedida?.message} />
            </div>
          </div>

          {/* Stocks + Precio */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <FieldLabel required>Stock actual</FieldLabel>
              <Controller
                name="stockActual"
                control={control}
                rules={{ min: { value: 0, message: "No puede ser negativo" } }}
                render={({ field }) => (
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={inputClass}
                  />
                )}
              />
              <FieldError message={errors.stockActual?.message} />
            </div>

            <div className="space-y-1.5">
              <FieldLabel required>Stock mínimo</FieldLabel>
              <Controller
                name="stockMinimo"
                control={control}
                rules={{ min: { value: 0, message: "No puede ser negativo" } }}
                render={({ field }) => (
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={inputClass}
                  />
                )}
              />
              <FieldError message={errors.stockMinimo?.message} />
            </div>

            <div className="space-y-1.5">
              <FieldLabel required>Precio unitario</FieldLabel>
              <Controller
                name="precioUnitario"
                control={control}
                rules={{ min: { value: 0, message: "Debe ser ≥ 0" } }}
                render={({ field }) => (
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={inputClass}
                  />
                )}
              />
              <FieldError message={errors.precioUnitario?.message} />
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-1.5">
            <FieldLabel>Estado</FieldLabel>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={`${selectTriggerClass} w-40`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="Activo" className="text-sm">Activo</SelectItem>
                    <SelectItem value="Inactivo" className="text-sm">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-[#F8F8F8]/50 hover:text-[#F8F8F8]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#FF5A00] hover:bg-[#e04e00] text-white border-0"
            >
              {isEditing ? "Guardar cambios" : "Crear insumo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

