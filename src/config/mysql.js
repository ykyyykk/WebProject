import mysql from "mysql2/promise";

// 連接池:
// MySQL 配置使用了連接池 這對於處理多個並發數據庫操作更有效率
// 不需要為每個請求創建新的連接 而是從池中獲取可用的連接。

const pool = mysql.createPool({
  host: "34.82.250.51",
  user: "aaa",
  password: "louise87276",
  database: "ShoppingWebsite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
