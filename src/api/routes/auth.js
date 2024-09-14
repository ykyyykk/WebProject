import express from "express";
import { db } from "../../config/sqlite3.js";
import { transporter } from "../../config/email.js";

const router = express.Router();

router.post("/register", (request, response) => {
  const { name, phoneNumber, email, password } = request.body;
  const sql = `INSERT INTO User (name, phoneNumber, email, password) VALUES(?,?,?,?)`;
  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(name, phoneNumber, email, password);
    response.status(200).json({ success: true, userID: info.lastInsertRowid });
  } catch (error) {
    next(error);
  }
});

router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const sql = `SELECT * FROM User WHERE email = ? AND password = ?`;

  try {
    const stmt = db.prepare(sql);
    const row = stmt.get(email, password);
    if (row) {
      response.status(200).json({ success: true, user: row });
    } else {
      response.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/sendverification", async (request, response) => {
  //檢查是否重複註冊
  const { email } = request.body;
  const checkSql = `SELECT email FROM User WHERE email = ?`;
  try {
    const stmt = db.prepare(checkSql);
    const row = stmt.get(email);
    console.log(row);
    if (row) {
      response
        .status(200)
        .json({ success: false, message: "此信箱已經註冊過了" });
      return;
    }
  } catch (error) {
    console.error(`發送驗證碼錯誤: ${error}`);
    next(error);
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const sql = `INSERT INTO Verification (email, code, createdAt, expiresAt) VALUES(?,?,?,?)`;
  const createdAt = Date.now();
  const expiresAt = Date.now() + 300000; //單位是毫秒

  try {
    const stmt = db.prepare(sql);
    // 不加toString()後面會有.0
    stmt.run(email, verificationCode.toString(), createdAt, expiresAt);

    const mailOption = {
      from: "louise87276@gmail.com",
      to: email,
      subject: "你的驗證碼",
      text: `你的驗證碼是: ${verificationCode}`,
    };
    await transporter.sendMail(mailOption);

    response.status(200).json({ success: true, message: "驗證碼已發送" });
  } catch (error) {
    console.error(`發送驗證碼錯誤: ${error}`);
    next(error);
  }
});

router.post("/checkverification", async (request, response) => {
  const { email, verificationCode } = request.body;
  const sql = `SELECT * FROM Verification WHERE email = ? AND code = ?`;

  try {
    const stmt = db.prepare(sql);
    const row = stmt.get(email, verificationCode);
    if (row) {
      response.status(200).json({ success: true, row: row });
    } else {
      response.status(200).json({ success: false, message: "驗證碼錯誤" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
