# Ejercicio 2 — Frontend React

Interfaz para gestión de productos que consume la API del ejercicio 1.

## Stack
- React 18, TypeScript, Vite, Tailwind CSS
- Zustand (state management), TanStack Query (server state), React Router v6
- react-hot-toast (notificaciones), lucide-react (íconos)

## Instalación

```bash
npm install
cp .env.example .env   # apuntar VITE_API_URL a tu backend
npm run dev
```

El frontend queda en `http://localhost:5173`

## Características
- Login / Registro con JWT
- Tabla paginada de productos con skeleton loading
- Filtros por búsqueda, categoría, estado y ordenamiento
- Modal crear/editar producto con validación
- Confirmación antes de eliminar
- Stats cards (total, activos, sin stock, precio promedio)
- Responsive (móvil, tablet, escritorio)
- Interceptor axios que inyecta JWT automáticamente y maneja 401

## Estructura de carpetas
```
src/
├── api/          # Capa de peticiones HTTP (axios + endpoints)
├── store/        # Estado global con Zustand (auth + UI productos)
├── hooks/        # Custom hooks con TanStack Query
├── types/        # Interfaces TypeScript
├── pages/        # LoginPage, ProductsPage
└── components/
    ├── layout/   # Navbar
    ├── products/ # StatsCards, ProductFilters, ProductTable, ProductForm
    └── ui/       # Pagination, DeleteConfirm
```
