import express from "express";
import Database from "better-sqlite3";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
// import fs from "fs"; // node.js內建

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(express.static(path.join(__dirname, 'public')));
const dbPath = path.resolve(__dirname, "data/ShoppingWebsite.db");

// console.log(`dbPath: ${dbPath}`);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = new Database(dbPath, { verbose: console.log });

const transporter = nodemailer.createTransport({
  service: "gmail",

  // pass不能更改 後面那一串是 應用程式密碼
  auth: {
    user: "louise87276@gmail.com",
    pass: "hssp gwtv aftv otkb",
  },
});

app.post("/api/checkverification", async (request, response) => {
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
    response.status(500).json({ error: error.message });
  }
});

app.post("/api/sendverification", async (request, response) => {
  const { email } = request.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const sql = `INSERT INTO Verification (email, code, createdAt, expiresAt) VALUES(?,?,?,?)`;
  const createdAt = Date.now();
  const expiresAt = Date.now() + 300000; //單位是毫秒

  const mailOption = {
    from: "louise87276@gmail.com",
    to: email,
    subject: "你的驗證碼",
    text: `你的驗證碼是: ${verificationCode}`,
  };

  try {
    const stmt = db.prepare(sql);
    // 不加toString()後面會有.0
    stmt.run(email, verificationCode.toString(), createdAt, expiresAt);
    await transporter.sendMail(mailOption);
    response.status(200).send("驗證碼已發送");
  } catch (error) {
    console.error(`發送驗證碼錯誤: ${error}`);
    return response.status(500).json({ error: error.message });
  }
});

// 失敗 嘗試讀取public/banner
// app.get("/api/images", (req, res) => {
//   const directoryPath = path.join(__dirname, "public", "banner");

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       return res.status(500).send("Internal Server Error");
//     }

//     // Filter for image files (you can add more extensions if needed)
//     const imagePaths = files
//       .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
//       .map((file) => `/banner/${file}`);

//     res.json(imagePaths);
//   });
// });

app.post("/api/purchaseItem", (request, response) => {
  const { itemID, buyAmount } = request.body;

  try {
    const checkSql = `SELECT stock
                      FROM Item
                      WHERE id = ?`;
    const checkStmt = db.prepare(checkSql);
    const item = checkStmt.get(itemID);

    console.log(item);
    // if (!item || item.stock < buyAmount) {
    //   return response.status(400).json({ success: false, message: "庫存不足" });
    // }
    // item.stock -= buyAmount;
    // const updateSql = `UPDATE Item
    //                    SET stock = ?
    //                    WHERE id = ?`;
    // const updateStmt = db.prepare(updateSql);
    // const info = checkStmt.run(item.stock, itemID);
    response.status(200).json({ success: true, item: item });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.post("/api/deletefromcart", (request, response) => {
  const { itemID, userID } = request.body;
  const sql = `DELETE FROM Cart WHERE itemID = ? AND userID = ?;`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(itemID, userID);
    response.status(200).json({ success: true, info: info });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.get("/api/getcartitems", (request, response) => {
  // 包起來才能抓到value 不然是body
  const { userID } = request.query;
  // SQL 查詢通過 userID 在 Cart 表中查詢，並使用 itemID 查找 Item 表中的對應項目
  const sql = `
    SELECT Item.* 
    FROM Cart 
    JOIN Item ON Cart.itemID = Item.id 
    WHERE Cart.userID = ?
  `;

  try {
    const stmt = db.prepare(sql);
    // 取得多行用all
    const rows = stmt.all(userID);
    if (rows.length > 0) {
      response.status(200).json({ success: true, items: rows });
    } else {
      //不要用404 這樣在Client會被歸類到error
      response.status(200).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
});

app.post("/api/addtocart", (request, response) => {
  const { itemID, userID, amount } = request.body;
  const sql = `INSERT INTO Cart (itemID, userID, buyAmount) VALUES(?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(itemID, userID, amount);
    response.status(200).json({ success: true, info: info });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

//聽說不要在api裡面含有get post put delete會比較好
app.post("/api/addnewitem", (request, response) => {
  const { name, detail, category, price, stock, status, imageUrl } =
    request.body;
  const sql = `INSERT INTO Item (name, detail, category, price, stock, status, imageUrl)
               VALUES(?,?,?,?,?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    stmt.run(name, detail, category, price, stock, status, imageUrl);
    response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.get("/api/item/:id", (request, response) => {
  // console.log(`request.params: ${request.params}`);
  const { id } = request.params;
  const sql = `SELECT * FROM Item WHERE id = ?`;

  try {
    const stmt = db.prepare(sql);
    const row = stmt.get(id);
    if (row) {
      response.status(200).json({ success: true, item: row });
    } else {
      response.status(404).json({ success: false, message: "item not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get("/api/getallitem", (request, response) => {
  // console.log(`request.body: ${request.body}`);
  const sql = `SELECT * FROM Item`;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all();
    if (rows.length > 0) {
      response.status(200).json({ success: true, items: rows });
    } else {
      response.status(404).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/api/register", (request, response) => {
  const { name, phoneNumber, email, password } = request.body;
  const sql = `INSERT INTO User (name, phoneNumber, email, password) VALUES(?,?,?,?)`;
  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(name, phoneNumber, email, password);
    response.status(200).json({ success: true, userID: info.lastInsertRowid });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.post("/api/login", (request, response) => {
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
    return response.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
