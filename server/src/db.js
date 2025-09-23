import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// utilidad para probar conexión al arrancar
export async function checkDbConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    return rows?.[0]?.ok === 1;
  } catch (err) {
    console.error("Error comprobando la DB:", err.message);
    return false;
  }
}
