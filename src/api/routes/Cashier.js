import express from "express";
import pool from "../../config/mysql.js";
import axios from "axios";

const router = express.Router();

router.post("/addorder", async (request, response, next) => {
  const {
    paymentType,
    tradeDate,
    totalAmount,
    itemName,
    checkMacValue,
    merchantTradeNo,
  } = request.body;
  const sql = `INSERT INTO ECPay 
               (paymentType, tradeDate, totalAmount, itemName, checkMacValue, merchantTradeNo)
               VALUES(?,?,?,?,?,?)`;

  try {
    await pool.execute(sql, [
      paymentType,
      tradeDate,
      totalAmount,
      itemName,
      checkMacValue,
      merchantTradeNo,
    ]);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/return", async (request, response, next) => {
  console.log(request.body);
  try {
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
