# Índice Activo de Cambios (SDD)

Este documento mantiene el registro de todos los cambios gestionados bajo la metodología Spec-Driven Development (SDD) en The Food Store.

Los cambios futuros se agregan como nuevas filas en esta tabla y **no se implementan sin aprobación humana**.

### Estados permitidos:
- **Draft:** Propuesta en redacción.
- **Approved:** Propuesta aprobada, lista para implementación.
- **In Progress:** Implementación en curso.
- **Done:** Implementado y verificado.
- **Rejected:** Propuesta rechazada.

## Registro de Cambios

| Change ID | Estado | Contexto | Artefactos |
|---|---|---|---|
| 000-project-baseline | Done | Documentación del estado actual del proyecto The Food Store | proposal, design, tasks, acceptance, verification |
| 001-backend-auth-module | Done | Creación del módulo de autenticación backend (JWT, bcrypt, SQLite) | proposal, design, tasks, acceptance, verification |
| 002-frontend-landing-premium | Done | Desarrollo de la UI pública premium con Tailwind y React Router | proposal, design, tasks, acceptance, verification |
| 003-fullstack-insumos-crud | Done | Implementación End-to-End del módulo de Insumos con baja lógica | proposal, design, tasks, acceptance, verification |
| 004-docker-infrastructure | Draft | Contenerización de la aplicación con Docker y Docker Compose | proposal |
| 005-dashboard-analytics | Draft | Implementación de gráficos y KPIs en el dashboard utilizando datos reales | proposal |
| 006-frontend-folder-restructure | Done | Mover todos los archivos y carpetas del frontend a una nueva carpeta `frontend` | proposal, design, tasks, acceptance, verification |
| 007-premium-ui-reservas-contacto | Done ⚠️ | Rediseño premium de páginas Reservas y Contacto — **implementado sin aprobación previa** | proposal, design, tasks, acceptance, verification |
