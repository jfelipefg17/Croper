# Ejercicio 1 — Backend NestJS + MongoDB

API REST completa para gestión de productos con autenticación JWT.

## Stack
- NestJS 10, MongoDB (Mongoose), Passport JWT, Swagger, class-validator, bcryptjs, @nestjs/throttler

## Requisitos
- Node.js >= 18
- MongoDB corriendo localmente o URI de Atlas

## Instalación rápida

```bash
npm install
cp .env.example .env   # editar MONGODB_URI y JWT_SECRET
npm run start:dev
```

## Con Docker

```bash
docker-compose up -d
```

## Endpoints

| Método | Ruta               | Auth | Descripción                     |
|--------|--------------------|------|---------------------------------|
| POST   | /auth/register     | ❌    | Crear usuario                   |
| POST   | /auth/login        | ❌    | Login → retorna JWT             |
| GET    | /auth/profile      | ✅    | Perfil del usuario autenticado  |
| GET    | /products          | ✅    | Listar con paginación y filtros |
| POST   | /products          | ✅    | Crear producto                  |
| GET    | /products/:id      | ✅    | Obtener por ID                  |
| PATCH  | /products/:id      | ✅    | Actualizar parcialmente         |
| DELETE | /products/:id      | ✅    | Eliminar                        |
| GET    | /products/stats    | ✅    | Estadísticas generales          |
| GET    | /products/categories | ✅  | Lista de categorías             |

## Documentación Swagger
`http://localhost:3000/api/docs`

## Query params para GET /products
| Param      | Tipo    | Descripción                     |
|------------|---------|---------------------------------|
| page       | number  | Página (default: 1)             |
| limit      | number  | Items por página (default: 10)  |
| search     | string  | Búsqueda por texto              |
| category   | string  | Filtrar por categoría           |
| isActive   | boolean | Filtrar activos/inactivos        |
| sortBy     | string  | Campo de ordenamiento           |
| sortOrder  | asc/desc| Dirección del ordenamiento      |
