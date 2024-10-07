import express from "express";
import pool from "../../config/mysql.js";

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

router.post("/Issue", async (request, response, next) => {
  console.log("Issue");

  const payload = {
    MerchantID: "2000132",
    RqHeader: {
      Timestamp: Math.floor(Date.now() / 1000),
    },
    // 加密過的資料
    Data: "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",
  };

  try {
    const response = await axios.post(
      "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue",
      payload,
      {
        headers: {
          "Content-Type": "application/json", // 根據 ECPay API 文件要求
        },
      }
    );
    console.log(response.data);
    res.status(200).send(response.data); // 傳回結果
  } catch (error) {
    console.error("API 呼叫失敗: ", error);
    res.status(500).send("API 呼叫失敗");
  }
});

export default router;
