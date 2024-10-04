import express from "express";
import pool from "../../config/mysql.js";

const router = express.Router();

router.get("/getalluser", async (request, response, next) => {
  const sql = `SELECT * FROM User`;

  try {
    const [users] = await pool.execute(sql);
    if (users.length > 0) {
      console.log("取得所有會員成功");
      response.status(200).json({ success: true, users });
    } else {
      response.status(404).json({ success: false, message: "找不到任何會員" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/deleteuser/:deleteID/:userID",
  async (request, response, next) => {
    const { deleteID, userID } = request.params;

    if (userID != 6) {
      response
        .status(200)
        .json({ success: false, message: "不是管理者不能刪除" });
      return;
    }
    const sql = `DELETE FROM User WHERE id = ?`;

    try {
      const [row] = await pool.execute(sql, [deleteID]);
      if ([row][0].affectedRows > 0) {
        response.status(200).json({ success: true });
      } else {
        response.status(404).json({ success: false, message: "找不到會員" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/updateuserpriceamount", async (request, response, next) => {
  const { userID, amount, price } = request.body;
  const sql = `UPDATE User
               SET totalPurchaseAmount = ?, totalPurchasePrice = ?
               WHERE id = ?;`;

  try {
    const [row] = await pool.execute(sql, [amount, price, userID]);
    if ([row][0].affectedRows <= 0) {
      response.status(404).json({ success: false, message: "找不到會員" });
      return;
    }
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
