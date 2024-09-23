import express from "express";
import pool from "../../config/mysql.js";

const router = express.Router();

router.post("/addrevenue", async (request, response, next) => {
  const { date, value } = request.body;
  const sql = `INSERT INTO Revenue (date,value)
               VALUES(?,?)`;

  try {
    await pool.execute(sql, [date, value]);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
