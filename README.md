#Proyecto Seguimiento de Pedidos

Aplicación **full stack** para gestionar pedidos y su estado, desarrollada como reto con:

- **Frontend:** React Native + Expo
- **Backend:** Node.js + Express
- **Base de Datos:** MySQL

---

##  Características principales

-  **Autenticación** básica con usuarios y contraseñas (hash en DB).
-  **CRUD de pedidos** (crear, leer, actualizar, borrar).
-  **Historial de estados** para cada pedido (bitácora auxiliar).
-  **Frontend móvil y web** con Expo (funciona en emulador y dispositivos reales).

---

##  Estructura del proyecto

shippingTracking/
│
├─ server/ # Backend Node + Express
│ ├─ src/
│ │ ├─ db.js
│ │ ├─ index.js
│ │ └─ routes/
│ └─ .env.example
│
├─ cliente-expo/ # Frontend Expo + React Native
│ ├─ app/
│ │ └─ index.js
│ └─ package.json
│
└─ README.md

yaml
Copiar código

---

##  Backend (Node + Express)

###  Requisitos
- Node.js >= 18
- MySQL >= 8

###  Configuración
1. Clonar el repo:
   ```bash
   git clone https://github.com/tuusuario/seguimiento-pedidos.git
   cd seguimiento-pedidos/server
Instalar dependencias:

bash
Copiar código
npm install
Crear archivo .env (puedes copiar del .env.example):

env
Copiar código
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=seguimiento_pedidos
Crear la base de datos e importar las tablas:

sql
Copiar código
CREATE DATABASE seguimiento_pedidos;
USE seguimiento_pedidos;
-- Ejecutar script SQL de las tablas (usuario, pedido, historial_estado)
Levantar servidor:

bash
Copiar código
npm run dev
 El backend estará disponible en http://localhost:3001
Verifica salud con: http://localhost:3001/health

 Frontend (Expo + React Native)
 Requisitos
Node.js >= 18

Expo CLI (npm install -g expo-cli) o usar npx

 Configuración
Ir al frontend:

bash
Copiar código
cd ../cliente-expo
Instalar dependencias:

bash
Copiar código
npm install
Editar API_BASE en app/index.js para apuntar a tu backend:

js
Copiar código
const API_BASE = "http://192.168.1.70:3001"; // IP de tu PC en LAN
Levantar app:

bash
Copiar código
npm run start
Opciones:

Web: presiona w en consola.

Android: presiona a (emulador o dispositivo Expo Go).

iOS (Mac): presiona i.

Celular real: escanea QR con Expo Go.

 Scripts útiles
 
Backend
npm run dev → Inicia servidor en desarrollo con Nodemon

npm start → Inicia servidor en producción

Frontend
npm run start → Inicia Expo DevTools

npm run android → Corre en emulador Android

npm run ios → Corre en emulador iOS

npm run web → Corre en navegador

Notas
Contraseñas siempre se almacenan en hash (bcrypt/argon2) desde el backend.

CORS habilitado en el servidor para permitir peticiones desde Expo.

.gitignore evita subir node_modules/, .env y archivos innecesarios.

Próximos pasos

 Mejorar diseño en Expo (estilos, navegación).

 Conectar frontend a backend en la nube.

Autores
Beto
Josue
Milton
Proyecto realizado como reto con Node.js + Express + MySQL + Expo (React Native).
