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

export default router;

// 目前沒用被getallrevenuewithitemcategory取代
// router.get("/getallrevenue", async (request, response, next) => {
//   const sql = `SELECT * FROM Revenue
//                ORDER BY date ASC;`;

//   try {
//     const [revenues] = await pool.execute(sql);
//     if (revenues.length > 0) {
//       console.log("取得所有營收成功");
//       response.status(200).json({ success: true, revenues: revenues });
//     } else {
//       response.status(404).json({ success: false, message: "找不到任何營收" });
//     }
//   } catch (error) {
//     next(error);
//   }
// });
