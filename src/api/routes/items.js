import express from "express";
import pool from "../../config/mysql.js";
import path from "path";
import { __dirname } from "../../utils/path.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    //指定儲存路徑
    cb(null, path.join(__dirname, "../../public/img"));
  },
  filename: (request, file, cb) => {
    //用時間當欓名
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/uploadimage",
  upload.array("images"),
  (request, response, next) => {
    if (!request.files || request.files.length === 0) {
      next(error);
    }
    console.log(`request.files: ${request.files}`);
    response.status(200).json({
      success: true,
      message: "圖片上傳成功",
      files: request.files,
    });
  }
);

//聽說不要在api裡面含有get post put delete會比較好
router.post("/addnewitem", async (request, response, next) => {
  const { id, name, detail, category, price, stock, status, thumbnail } =
    request.body;
  const sql = `INSERT INTO Item (id,name, detail, category, price, stock, status, thumbnail)
               VALUES(?,?,?,?,?,?,?,?)`;

  try {
    await pool.execute(sql, [
      id,
      name,
      detail,
      category,
      price,
      stock,
      status,
      thumbnail,
    ]);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/insertmultipleimages", async (request, response, next) => {
  const { itemID, imageUrls } = request.body;
  const sql = `INSERT INTO Image (itemID, imageUrl)
               VALUES(?,?)`;
  try {
    for (let i = 0; i < imageUrls.length; i++) {
      await pool.execute(sql, [itemID.toString(), imageUrls[i]]);
    }
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/item/:id", async (request, response, next) => {
  const { id } = request.params;
  const sql = `SELECT * FROM Item WHERE id = ?`;

  try {
    const [row] = await pool.execute(sql, [id]);
    if (row) {
      // 改成mysql後 取得單一物品都要這樣 login也是
      response.status(200).json({ success: true, item: row[0] });
    } else {
      response.status(404).json({ success: false, message: "item not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/getallitem", async (request, response, next) => {
  const sql = `SELECT * FROM Item`;

  try {
    const [rows] = await pool.execute(sql);
    if (rows.length > 0) {
      console.log("取得所有物品成功");
      response.status(200).json({ success: true, items: rows });
    } else {
      response.status(404).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/getitemimage", async (request, response, next) => {
  const { itemID } = request.body;
  const sql = `SELECT * FROM Image WHERE itemID = ?`;

  try {
    const [rows] = await pool.execute(sql, [itemID.toString()]);
    if (rows.length > 0) {
      response.status(200).json({ success: true, items: rows });
    } else {
      response.status(200).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/purchaseitem", async (request, response, next) => {
  const { id, amount } = request.body;
  try {
    const checkSql = `SELECT *
                      FROM Item
                      WHERE id = ?`;
    const [item] = await pool.execute(checkSql, [id]);
    if (!item) {
      return response
        .status(200)
        .json({ success: false, message: "找不到物品" });
    }
    if (item.stock < amount) {
      return response.status(200).json({ success: false, message: "庫存不足" });
    }

    item.stock -= amount;
    item.saleAmount += amount;
    const updateSql = `UPDATE Item
                       SET stock = ?, saleAmount = ? 
                       WHERE id = ?`;

    await pool.execute(updateSql, [item.stock, item.saleAmount, id]);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/deletefromdatabase/:itemID/:userID",
  async (request, response, next) => {
    const { itemID, userID } = request.params;

    if (userID != 6) {
      console.log("不是管理者不能下架");
      next();
      return;
    }
    const sql = `DELETE FROM Item WHERE id = ?`;

    try {
      console.log(sql);
      console.log(itemID);
      const [row] = await pool.execute(sql, [itemID]);
      if (row) {
        response.status(200).json({ success: true });
      } else {
        response
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
