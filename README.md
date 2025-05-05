# 🍔 Sistema de Gestión de Pedidos

Aplicación web que permite a los usuarios registrarse, iniciar sesión, visualizar productos y realizar pedidos. Los administradores pueden gestionar productos y ver las órdenes realizadas.

---

## 🧩 Tecnologías Usadas

- **Frontend:** Vite + React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Base de Datos:** MongoDB
- **Autenticación:** JWT
- **Gestión de estado:** React Context API
- **Linter:** TS-Standard

---

## 👤 Roles de usuario

- **Admin:** Puede crear productos y ver todas las órdenes disponibles
- **Cliente:** Puede ver productos, agregarlos al carrito y realizar órdenes

## 🚀 Instalación

### 📦 Backend

1. Ve al directorio del backend:

```bash
cd backend
```

2. Instala las dependencias

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del backend con la siguiente información

```bash
PORT
MONGODB_URI
JWT_SECRET
JWT_EXPIRATION
```

4. Ejecuta el servidor

```bash
npm run start
```

**El backend correrá por defecto en `http://localhost:3000`**

---

### 💻 Frontend

1. Ve al directorio del frontend

```bash
cd frontend
```

2. Instala las dependencias

```bash
npm install
```

3. Ejecuta la aplicación

```bash
npm run dev
```

**El frontend correrá por defecto en `http://localhost:5173`**
