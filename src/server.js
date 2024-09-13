import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./api/routes/auth.js";
import itemRoutes from "./api/routes/items.js";
import cartRoutes from "./api/routes/cart.js";
import googleLogin from "./api/routes/googleLogin.js";
import { ErrorHandler } from "./api/middleware/errorhandler.js";
import { __dirname } from "./utils/path.js";
import path from "path";

const app = express();

// 本來是 app.use(cors()); 但為了增加google登入 不確定origin 會不會影響之後部署
app.use(
  cors({
    origin: ["http://localhost:5173", "http://your-deployment-url.com"], // 允许多个来源
    methods: ["GET", "POST"], // 允许的方法
    credentials: true, // 如果有需要，可以允许发送 cookie
  })
);

// Cross-Origin-Opener-Policy policy would block the window.closed call.這個Error解決不了
// app.use((req, res, next) => {
//   // res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   // res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });

app.use(express.json());
app.use(bodyParser.json());
// 提供靜態文件的路徑
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", googleLogin);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
