import express from "express";
import sqlite3 from "sqlite3";
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

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("無法連接到資料庫", error.message);
  } else {
    console.log("成功連接到 SQLite 資料庫");
  }
});

app.post("/api/register", (request, response) => {
  const { name, phoneNumber, email } = request.body;
  const sql = `INSERT INTO User (name, phoneNumber, email) VALUES(?,?,?)`;

  db.run(sql, [name, phoneNumber, email], function (error) {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    response.status(200).json({ success: true, userId: this.lastID });
  });
});

app.post("/api/login", (request, response) => {
  const { email, password } = request.body;
  const sql = `SELECT * FROM User WHERE email = ? AND password = ?`;

  db.get(sql, [email, password], (error, row) => {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    if (row) {
      response.status(200).json({ success: true, user: row });
    } else {
      response.status(404).json({ success: false, message: "User not found" });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
