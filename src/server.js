import express, { response } from "express";
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
// const db = new sqlite3.Database(dbPath, (error) => {
//   if (error) {
//     console.error("無法連接到資料庫", error.message);
//   } else {
//     console.log("成功連接到 SQLite 資料庫");
//   }
// });

// app;

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
  console.log(`request.params: ${request.params}`);
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
  // console.log("/api/getallitem");
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
  const { name, phoneNumber, email } = request.body;
  const sql = `INSERT INTO User (name, phoneNumber, email) VALUES(?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(name, phoneNumber, email);
    response.status(200).json({ success: true, userId: info.lastInsertRowid });
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
