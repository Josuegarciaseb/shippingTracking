// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./db.js";
import healthRoutes from "./routes/health.js";
import pedidosRoutes from "./routes/pedidos.js";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));   // para Expo en LAN
app.use(express.json());

app.use("/", healthRoutes);
app.use("/pedidos", pedidosRoutes);

const PORT = Number(process.env.PORT || 3001);

app.listen(PORT, async () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
  const dbOk = await checkDbConnection();
  console.log(dbOk ? "Conectado a MySQL" : "MySQL no disponible");
});
