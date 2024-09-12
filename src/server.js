import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./api/routes/auth.js";
import itemRoutes from "./api/routes/items.js";
import cartRoutes from "./api/routes/cart.js";
import { ErrorHandler } from "./api/middleware/errorhandler.js";
import { __dirname } from "./utils/path.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// 提供靜態文件的路徑
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
// app.use("/api/upload", uploadRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
