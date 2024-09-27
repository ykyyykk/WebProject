import express from "express";
import pool from "../../config/mysql.js";

const router = express.Router();

router.delete(
  "/deletefromcart/:itemID/:userID",
  async (request, response, next) => {
    const { itemID, userID } = request.params;
    const sql = `DELETE FROM Cart WHERE itemID = ? AND userID = ?;`;

    try {
      const [info] = await pool.execute(sql, [itemID, userID]);
      response.status(200).json({ success: true, info: info });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/getcartitems", async (request, response, next) => {
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
    const [rows] = await pool.execute(sql, [userID]);
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

router.post("/addtocart", async (request, response, next) => {
  const { itemID, userID, amount } = request.body;
  const selectSql = `SELECT * FROM Cart WHERE itemID = ? AND userID = ?`;
  const insertSql = `INSERT INTO Cart (itemID, userID, buyAmount) VALUES(?,?,?)`;
  const updateSql = `UPDATE Cart SET buyAmount = ? WHERE itemID = ? AND userID = ?`;

  try {
    const [row] = await pool.execute(selectSql, [itemID, userID]);
    if (row.length > 0) {
      const buyAmount = +row[0].buyAmount + +amount;
      await pool.execute(updateSql, [buyAmount, itemID, userID]);
    } else {
      await pool.execute(insertSql, [itemID, userID, amount]);
    }
    response.status(200).json({ success: true });
    next();
  } catch (error) {
    next(error);
  }
});

router.post("/changecartamount", async (request, response, next) => {
  const { itemID, userID, amount } = request.body;
  const sql = `UPDATE Cart SET buyAmount = ? WHERE itemID = ? AND userID = ?`;

  try {
    await pool.execute(sql, [amount, itemID, userID]);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
