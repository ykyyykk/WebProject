import express from "express";
import pool from "../../config/mysql.js";
import { transporter } from "../../config/email.js";

const router = express.Router();

router.post("/register", async (request, response, next) => {
  console.log("register");
  const { name, phoneNumber, email, password } = request.body;
  const sql = `INSERT INTO User (name, phoneNumber, email, password) VALUES(?,?,?,?)`;
  try {
    const [info] = await pool.execute(sql, [
      name,
      phoneNumber,
      email,
      password,
    ]);
    response.status(200).json({ success: true, userID: info.lastInsertRowid });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (request, response, next) => {
  const { email, password } = request.body;
  const sql = `SELECT * FROM User WHERE email = ? AND password = ?`;

  try {
    const [row] = await pool.execute(sql, [email, password]);
    if (row[0]) {
      response.status(200).json({ success: true, user: row[0] });
    } else {
      response.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/sendverification", async (request, response, next) => {
  //檢查是否重複註冊
  const { email } = request.body;
  const checkSql = `SELECT email FROM User WHERE email = ?`;
  try {
    const [row] = await pool.execute(checkSql, [email]);
    if (row.length > 0) {
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
    // 不加toString()後面會有.0
    await pool.execute(sql, [
      email,
      verificationCode.toString(),
      createdAt,
      expiresAt,
    ]);

    const mailOption = {
      from: "louise87276@gmail.com",
      to: email,
      subject: "你的驗證碼",
      text: `你的驗證碼是: ${verificationCode}`,
    };
    await transporter.sendMail(mailOption);

    response.status(200).json({ success: true, message: "驗證碼已發送" });
  } catch (error) {
    next(error);
  }
});

router.post("/checkverification", async (request, response, next) => {
  const { email, verificationCode } = request.body;
  const sql = `SELECT * FROM Verification WHERE email = ? AND code = ?`;
  const deleteSql = `DELETE FROM Verification WHERE email = ?`;

  try {
    const [row] = await pool.execute(sql, [email, verificationCode]);
    if (row.length <= 0) {
      response.status(200).json({ success: false, message: "驗證碼錯誤" });
      return;
    }

    response.status(200).json({ success: true });

    await pool.execute(deleteSql, [email]);
  } catch (error) {
    next(error);
  }
});

router.post("/checkforgotpassword", async (request, response, next) => {
  const { email, verificationCode } = request.body;
  const sql = `SELECT * FROM Verification WHERE email = ? AND code = ?`;
  const selectSql = `SELECT password FROM User WHERE email = ?`;
  const deleteSql = `DELETE FROM Verification WHERE email = ?`;

  try {
    const [row] = await pool.execute(sql, [email, verificationCode]);
    if (row.length <= 0) {
      response.status(200).json({ success: false, message: "驗證碼錯誤" });
      return;
    }

    const [selectRow] = await pool.execute(selectSql, [email]);
    console.log(selectRow);
    if (selectRow.length <= 0) {
      response.status(200).json({ success: false, message: "找不到信箱" });
      return;
    }

    response.status(200).json({ success: true, row: selectRow[0] });

    await pool.execute(deleteSql, [email]);
  } catch (error) {
    next(error);
  }
});

router.post("/sendforgotpasswordcode", async (request, response, next) => {
  //檢查是否重複註冊
  const { email } = request.body;
  const checkSql = `SELECT email FROM User WHERE email = ?`;
  const sql = `INSERT INTO Verification (email, code, createdAt, expiresAt) VALUES(?,?,?,?)`;

  try {
    const [row] = await pool.execute(checkSql, [email]);

    if (row.length <= 0) {
      response
        .status(200)
        .json({ success: false, message: "該信箱從未被註冊過！" });
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const createdAt = Date.now();
  const expiresAt = Date.now() + 300000; //單位是毫秒

  try {
    const mailOption = {
      from: "louise87276@gmail.com",
      to: email,
      subject: "你的驗證碼",
      text: `你的驗證碼是: ${verificationCode}`,
    };
    await transporter.sendMail(mailOption);

    // 不加toString()後面會有.0
    await pool.execute(sql, [
      email,
      verificationCode.toString(),
      createdAt,
      expiresAt,
    ]);
    response.status(200).json({ success: true, message: "驗證碼已發送" });
  } catch (error) {
    console.error(`發送驗證碼錯誤: ${error}`);
    next(error);
  }
});

router.delete("/deleteexpiresverification", async (request, response, next) => {
  const sql = `DELETE FROM Verification WHERE expiresAt <= ?`;

  try {
    const [row] = await pool.execute(sql, [Date.now()]);
    if (row) {
      response.status(200).json({ success: true, data: row });
    } else {
      response.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
