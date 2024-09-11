import express from "express";
import Database from "better-sqlite3";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import multer from "multer";
//為了使用__dirname 和 __filename
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
// import fs from "fs"; // node.js內建

// WebProject/
// │
// ├── public/         # 在src之外的東西不會被打包
// │   └── img/        # 客戶上傳的圖片
// │
// ├── src/            #
// │   └── assets/     # 其他靜態的文件
// │       └── logo/   # logo icon之類的
// │
// └── server.js       # 伺服器Code

//設定__filename 為server.目前位置 所以是D:\Desktop\Git\WebProject\src\server.js
const __filename = fileURLToPath(import.meta.url);
//設定__dirname 為目前__filename 的上一層 所以是D:\Desktop\Git\WebProject\src
const __dirname = path.dirname(__filename);

// console.log(`__filename: ${__filename}`);
// console.log(`__dirname: ${__dirname}`);

const app = express();
// 拼接絕對路徑
const dbPath = path.resolve(__dirname, "data/ShoppingWebsite.db");

// console.log(`dbPath: ${dbPath}`);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// 提供靜態文件的路徑
app.use(express.static(path.join(__dirname, "public")));

// verbose是將SQL的輸出 放在console
const db = new Database(dbPath, { verbose: console.log });

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    //指定儲存路徑
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: (request, file, cb) => {
    //用時間當欓名
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.array("images"), (request, response) => {
  console.log(`request: ${JSON.stringify(request.body)}`);
  console.log(`Number of files uploaded: ${request.files.length}`);
  console.log(request.files);
  if (!request.files || request.files.length === 0) {
    console.log("失敗");
    return response.status(400).json({ error: "請選擇要上傳的圖片" });
  }
  response.json({ message: "圖片上傳成功", files: request.files });
});

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
    return response.status(500).json({ error: error.message });
  }

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
    response.status(200).json({ success: true, message: "驗證碼已發送" });
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
  const { id, amount } = request.body;
  try {
    const checkSql = `SELECT *
                      FROM Item
                      WHERE id = ?`;
    const checkStmt = db.prepare(checkSql);
    const item = checkStmt.get(id);

    console.log(item);
    if (!item) {
      return response
        .status(200)
        .json({ success: false, message: "找不到物品" });
    }
    if (item.stock < amount) {
      return response.status(200).json({ success: false, message: "庫存不足" });
    }

    item.stock -= amount;
    item.saleAmount += amount;
    const updateSql = `UPDATE Item
                       SET stock = ?, saleAmount = ? 
                       WHERE id = ?`;
    const updateStmt = db.prepare(updateSql);
    const info = updateStmt.run(item.stock, item.saleAmount, id);

    response.status(200).json({ success: true, item: info });
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
    SELECT Item.*, Cart.buyAmount
    FROM Cart 
    JOIN Item ON Cart.itemID = Item.id 
    WHERE Cart.userID = ?;
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
