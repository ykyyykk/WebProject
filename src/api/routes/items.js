import express from "express";
import { db } from "../../config/sqlite3.js";
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

router.post("/api/test", async (request, response) => {
  console.log("WebProject Test");
});

router.post("/uploadimage", upload.array("images"), (request, response) => {
  if (!request.files || request.files.length === 0) {
    next(error);
  }
  console.log(`request.files: ${request.files}`);
  response.status(200).json({
    success: true,
    message: "圖片上傳成功",
    files: request.files,
  });
});

//聽說不要在api裡面含有get post put delete會比較好
router.post("/addnewitem", (request, response) => {
  const { id, name, detail, category, price, stock, status, thumnail } =
    request.body;
  const sql = `INSERT INTO Item (id,name, detail, category, price, stock, status, thumnail)
               VALUES(?,?,?,?,?,?,?,?)`;

  try {
    const stmt = db.prepare(sql);
    stmt.run(id, name, detail, category, price, stock, status, thumnail);
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/insertmultipleimages", (request, response) => {
  const { itemID, imageUrls } = request.body;
  const sql = `INSERT INTO Image (itemID, imageUrl)
               VALUES(?,?)`;
  try {
    const stmt = db.prepare(sql);
    for (let i = 0; i < imageUrls.length; i++) {
      stmt.run(itemID.toString(), imageUrls[i]);
    }
    response.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get("/item/:id", (request, response) => {
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
    next(error);
  }
});

router.get("/getallitem", (request, response) => {
  const sql = `SELECT * FROM Item`;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all();
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

router.post("/getitemimage", (request, response) => {
  const { itemID } = request.body;
  const sql = `SELECT * FROM Image WHERE itemID = ?`;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all(itemID.toString());
    console.log(`rows: ${rows}`);
    if (rows.length > 0) {
      response.status(200).json({ success: true, items: rows });
    } else {
      response.status(200).json({ success: false, message: "no items found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/purchaseItem", (request, response) => {
  const { id, amount } = request.body;
  try {
    const checkSql = `SELECT *
                      FROM Item
                      WHERE id = ?`;
    const checkStmt = db.prepare(checkSql);
    const item = checkStmt.get(id);

    console.log(item);
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
    const updateStmt = db.prepare(updateSql);
    const info = updateStmt.run(item.stock, item.saleAmount, id);

    response.status(200).json({ success: true, item: info });
  } catch (error) {
    next(error);
  }
});

export default router;
