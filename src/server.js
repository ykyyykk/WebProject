import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./api/routes/Auth.js";
import itemRoutes from "./api/routes/Items.js";
import cashierRoutes from "./api/routes/Cashier.js";
import b2cInvoiceRoutes from "./api/routes/B2CInvoice.js";
import revenueRoutes from "./api/routes/Revenue.js";
import userRoutes from "./api/routes/User.js";
import cartRoutes from "./api/routes/Cart.js";
import googleAuth from "./api/routes/GoogleAuth.js";
import { __dirname } from "./utils/path.js";
import path from "path";

const app = express();

// 本來是 app.use(cors()); 但為了增加google登入 不確定origin 會不會影響之後部署
app.use(
  cors({
    // 允許多個來源
    origin: [
      "http://localhost:5173",
      "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue",
    ],
    // 允許的方法 如果沒有就不沒辦法使用
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "*",
    allowedOrigins: "*",
    credentials: true, // 如果有需要，可以允许发送 cookie
  })
);

app.use(express.json());
app.use(bodyParser.json());
// 提供靜態文件的路徑
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", cashierRoutes);
app.use("/api", b2cInvoiceRoutes);
app.use("/api", revenueRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", googleAuth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
