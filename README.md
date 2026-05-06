# Real Estate API (API REST de Gestión de Propiedades)

Este proyecto es una API REST robusta construida con **Node.js, Express y TypeScript** para la gestión de un catálogo de propiedades inmobiliarias. Está diseñada siguiendo los principios de **Clean Architecture** para asegurar la mantenibilidad, escalabilidad y el desacoplamiento entre las reglas de negocio y las herramientas externas.

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de iniciar:
- **Node.js**: v18.x o superior.
- **npm**: v9.x o superior.
- **PostgreSQL**: Si deseas probar localmente, o una cuenta en **Supabase** para base de datos en la nube.

## 🛠️ Instalación y Setup

1. Clona el repositorio e instala las dependencias:
   ```bash
   git clone https://github.com/Berriop/backend_practica.git
   cd backend_practica
   npm install
   ```
2. Configura las variables de entorno basándote en el archivo `.env.example` (ver sección abajo).
3. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```
4. Ejecuta las migraciones de la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

El servidor estará escuchando en `http://localhost:3000`.

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Estas son las variables necesarias:

```env
# Puerto del servidor
PORT=3000

# Base de datos (Connection string de Supabase o Local)
DATABASE_URL="postgresql://usuario:password@host:puerto/db_name?schema=public"

# Configuración JWT y Admin
JWT_SECRET="tu_secreto_super_seguro_jwt"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin_password_fuerte"
# ADMIN_PASSWORD_HASH="$2a$10$..." (Opcional, si prefieres usar bcrypt)
```

## 🔑 Cómo obtener el token JWT

El API está protegida y requiere un token JWT para los endpoints de modificación (POST, PUT, DELETE). Para obtenerlo:
1. Haz un `POST` a `/api/v1/auth/login` enviando las credenciales configuradas en tus variables de entorno (`ADMIN_EMAIL` y `ADMIN_PASSWORD`).
2. Recibirás un token. En tus siguientes peticiones a las rutas protegidas, incluye este token en el header HTTP de la siguiente forma:
   ```http
   Authorization: Bearer <TU_TOKEN_AQUI>
   ```

## 🚀 Tabla de Endpoints

| Método | Ruta | Protegido | Descripción |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | ❌ No | Iniciar sesión y obtener token JWT |
| `GET` | `/api/v1/properties` | ❌ No | Obtener todas las propiedades (Soporta paginación y filtros) |
| `GET` | `/api/v1/properties/:id` | ❌ No | Obtener una propiedad por su ID |
| `POST` | `/api/v1/properties` | 🔒 Sí | Crear una nueva propiedad |
| `PUT` | `/api/v1/properties/:id` | 🔒 Sí | Actualizar una propiedad existente |
| `DELETE`| `/api/v1/properties/:id` | 🔒 Sí | Eliminar una propiedad |

---

## 📝 Ejemplos de Peticiones y Respuestas

### 1. Autenticación (Login)
**Request:** `POST /api/v1/auth/login`
```json
{
  "email": "admin@example.com",
  "password": "admin_password_fuerte"
}
```
**Response (200 OK):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### 2. Obtener Propiedades
Soporta query params: `?page=1&limit=10&location=madrid&minPrice=100000&maxPrice=500000`
**Request:** `GET /api/v1/properties`
**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Apartamento en el centro",
      "price": 150000.5,
      "location": "Madrid",
      "available": true,
      "createdAt": "2023-10-25T10:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### 3. Obtener Propiedad por ID
**Request:** `GET /api/v1/properties/1`
**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Apartamento en el centro",
  "price": 150000.5,
  "location": "Madrid",
  "available": true,
  "createdAt": "2023-10-25T10:00:00.000Z"
}
```

### 4. Crear Propiedad (Protegido)
**Request:** `POST /api/v1/properties`
*(Requiere header `Authorization: Bearer <token>`)*
```json
{
  "title": "Casa de Playa",
  "price": 300000,
  "location": "Málaga",
  "available": true
}
```
**Response (201 Created):**
```json
{
  "id": 2,
  "title": "Casa de Playa",
  "price": 300000,
  "location": "Málaga",
  "available": true,
  "createdAt": "2023-10-25T10:30:00.000Z"
}
```

### 5. Actualizar Propiedad (Protegido)
**Request:** `PUT /api/v1/properties/2`
*(Requiere header `Authorization: Bearer <token>`)*
```json
{
  "price": 280000
}
```
**Response (200 OK):**
```json
{
  "id": 2,
  "title": "Casa de Playa",
  "price": 280000,
  "location": "Málaga",
  "available": true,
  "createdAt": "2023-10-25T10:30:00.000Z"
}
```

### 6. Eliminar Propiedad (Protegido)
**Request:** `DELETE /api/v1/properties/2`
*(Requiere header `Authorization: Bearer <token>`)*
**Response (204 No Content)** *(Vacío)*

---

## 🏗️ Decisiones Técnicas

* **Clean Architecture**: Se decidió usar Arquitectura Limpia (Dominio, Casos de Uso, Infraestructura) para mantener la lógica de negocio (Dominio) independiente de los frameworks (Express, Prisma). Esto permite escalar el proyecto, hacer pruebas más fácilmente y cambiar tecnologías en el futuro sin reescribir toda la aplicación.
* **Prisma ORM**: Elegido por su robustez, su tipado fuerte con TypeScript y la facilidad para generar migraciones. Prisma permite interactuar con la base de datos a través de un esquema declarativo claro.
* **Zod**: Seleccionado para la validación de esquemas y datos entrantes (Request body/query). Zod se integra perfectamente con TypeScript, infiriendo los tipos estáticos directamente de los esquemas, lo que evita redundancia y garantiza la integridad de la data antes de que llegue a los Casos de Uso.
* **Supabase (PostgreSQL)**: Supabase ofrece una base de datos PostgreSQL gestionada en la nube con un rendimiento excelente y conexión directa. Es ideal para proyectos que requieren escalabilidad rápida, compatibilidad con ORMs estándar y funcionalidades backend-as-a-service.
