import express from "express";
import pool from "../../config/mysql.js";

const router = express.Router();

router.get(
  "/getallrevenuewithitemcategory",
  async (request, response, next) => {
    const sql = `SELECT Revenue.*, Item.category 
                 FROM Item 
                 JOIN Revenue ON Item.id = Revenue.itemID
                 ORDER BY date ASC;`;

    try {
      const [revenues] = await pool.execute(sql);
      if (revenues.length > 0) {
        console.log("取得所有營收成功");
        response.status(200).json({ success: true, revenues: revenues });
      } else {
        response
          .status(404)
          .json({ success: false, message: "找不到任何營收" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/addrevnue", async (request, response, next) => {
  const { date, value, id } = request.body;
  const revenueSql = `INSERT INTO Revenue (date,value,itemID)
                      VALUES(?,?,?)`;
  try {
    await pool.execute(revenueSql, [date, value, id]);

    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/itemssoldamount", async (request, response, next) => {
  // 一次性取得每個itemID 的賣出個數 而不是對每個id 單獨去call api
  const sql = `
    SELECT itemID, COUNT(*) as soldAmount
    FROM Revenue
    GROUP BY itemID
  `;

  try {
    const [results] = await pool.query(sql);
    const salesMap = results.reduce((acc, row) => {
      acc[row.itemID] = row.soldAmount;
      return acc;
    }, {});

    response.status(200).json({ success: true, sales: salesMap });
  } catch (error) {
    console.error("Error fetching item sales:", error);
    response.status(500).json({ success: false, message: "內部服務器錯誤" });
  }
});

export default router;
