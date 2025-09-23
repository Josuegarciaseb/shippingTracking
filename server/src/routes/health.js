import { Router } from "express";
import { checkDbConnection } from "../db.js";
const router = Router();

router.get("/health", async (_req, res) => {
  const dbOk = await checkDbConnection();
  res.json({
    service: "seguimiento-pedidos-api",
    time: new Date().toISOString(),
    db: dbOk ? "up" : "down"
  });
});

export default router;
