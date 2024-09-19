import Database from "better-sqlite3";
import path from "path";
import { __dirname } from "../utils/path.js";

// 拼接絕對路徑
const dbPath = path.resolve(__dirname, "../data/ShoppingWebsite.db");
export const db = new Database(dbPath, { verbose: console.log });
//目前沒有用 已經被mysql完全取代
