// src/routes/pedidos.js
import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

// listar pedidos (del usuario X opcional, y por estado opcional)
router.get("/", async (req, res) => {
  const { usuario_id, estado } = req.query;
  const params = [];
  let sql = "SELECT id, usuario_id, titulo, estado_actual, creado_en FROM pedido WHERE 1=1";
  if (usuario_id) { sql += " AND usuario_id = ?"; params.push(usuario_id); }
  if (estado) { sql += " AND estado_actual = ?"; params.push(estado); }
  sql += " ORDER BY creado_en DESC LIMIT 100";
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

// crear pedido
router.post("/", async (req, res) => {
  const { usuario_id, titulo, descripcion, fecha_promesa } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [r1] = await conn.query(
      `INSERT INTO pedido (usuario_id, titulo, descripcion, fecha_promesa)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, titulo, descripcion ?? null, fecha_promesa ?? null]
    );
    const pedidoId = r1.insertId;

    await conn.query(
      `INSERT INTO historial_estado (pedido_id, estado, comentario, changed_by_user_id)
       VALUES (?, 'pendiente', 'Pedido creado', ?)`,
      [pedidoId, usuario_id]
    );
    await conn.commit();
    res.status(201).json({ id: pedidoId, message: "Pedido creado" });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: e.message });
  } finally {
    conn.release();
  }
});

export default router;
