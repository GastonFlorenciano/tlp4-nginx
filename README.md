# 🚀 Gestor de Tareas con Nginx, Docker y TypeScript

Este proyecto es una aplicación de gestión de tareas que utiliza React (Frontend), Node/Express (Backend) y MongoDB (Base de datos), orquestada completamente con **Docker Compose** detrás de un proxy Nginx.

---

## 🛠️ Requisitos

Asegúrate de tener instalado **Docker** y **Docker Compose** en tu sistema.

---

## 🏁 Cómo Correr el Proyecto

Sigue estos pasos para levantar toda la arquitectura de la aplicación:

### 1. Configuración de Variables de Entorno

Debes crear un archivo .env en la raíz del proyecto para configurar las variables necesarias, especialmente la conexión a MongoDB.

Ejemplo de `.env`:

# Backend

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/tareasdb
```

### 2. Levantar los Contenedores

Ejecuta el siguiente comando en el directorio principal. Usamos --build para asegurarnos de que el código de la API y el Frontend se compilen correctamente.

```bash
docker-compose up --build
```

## 🔗 Acceder a la Aplicación

Una vez que Docker Compose termine de levantar los servicios:Abre tu navegador y navega a la siguiente dirección:
http://localhost

### 🗑️ Detener y Limpiar

Para detener y eliminar todos los contenedores, redes y volúmenes (si están definidos), usa:

```bash
docker compose down
```
