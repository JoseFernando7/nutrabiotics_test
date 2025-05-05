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

## 🔧 Requisitos

- npm
- node
- Docker
- Docker Compose

## 👤 Roles de usuario

- **Admin:** Puede crear productos y ver todas las órdenes disponibles
- **Cliente:** Puede ver productos, agregarlos al carrito y realizar órdenes

---

## 🚀 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/JoseFernando7/nutrabiotics_test.git
cd nutrabiotics_test
```

2. Ejecutar el proyecto con Docker Compose

```bash
docker compose up --build
```

¡Eso es todo! 🎉 Los servicios se levantarán automáticamente:

- **Frontend (React): `http://localhost:5173`**

- **Backend (Express API): `http://localhost:3000`**
