import express from "express";
import { db } from "../../config/sqlite3.js";

const router = express.Router();

router.delete("/deletefromcart/:itemID/:userID", (request, response, next) => {
  const { itemID, userID } = request.params;
  const sql = `DELETE FROM Cart WHERE itemID = ? AND userID = ?;`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(itemID, userID);
    console.log(`info: ${JSON.stringify(info)}`);
    response.status(200).json({ success: true, info: info });
  } catch (error) {
    next(error);
  }
});

router.get("/getcartitems", (request, response) => {
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
    next(error);
  }
});

router.post("/addtocart", (request, response) => {
  const { itemID, userID, amount } = request.body;
  const sql = `INSERT INTO Cart (itemID, userID, buyAmount) VALUES(?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    const info = stmt.run(itemID, userID, amount);
    response.status(200).json({ success: true, info: info });
  } catch (error) {
    next(error);
  }
});

export default router;
