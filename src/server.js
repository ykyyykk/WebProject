import express from "express";
import Database from "better-sqlite3";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const dbPath = path.resolve(__dirname, "data/ShoppingWebsite.db");

// console.log(`dbPath: ${dbPath}`);

app.use(cors());
app.use(bodyParser.json());

const db = new Database(dbPath, { verbose: console.log });

app.post("/api/getcartitems", (request, response) => {
  // console.log(11111);
  // console.log(request.body);
  // 包起來才能抓到value 不然是body
  const { userID } = request.body;
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
      response.status(404).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/api/addtocart", (request, response) => {
  const { itemID, userID, buyAmount } = request.body;
  const sql = `INSERT INTO Cart (itemID, userID, buyAmount) VALUES(?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(itemID, userID, buyAmount);
    response.status(200).json({ success: true, info: info });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

//聽說不要在api裡面含有get post put delete會比較好
app.post("/api/addnewitem", (request, response) => {
  const { name, detail, category, price, stock, status } = request.body;
  const sql = `INSERT INTO Item (name, detail, category, price, stock, status) VALUES(?,?,?,?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    stmt.run(name, detail, category, price, stock, status);
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

//TODOError: 還沒設定password
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
