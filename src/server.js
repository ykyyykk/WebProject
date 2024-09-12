import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./api/routes/auth.js";
import itemRoutes from "./api/routes/items.js";
import cartRoutes from "./api/routes/cart.js";
import { ErrorHandler } from "./api/middleware/errorhandler.js";
import { __dirname } from "./utils/path.js";
import path from "path";
import { OAuth2Client } from "google-auth-library";

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

const client = new OAuth2Client(
  "80477468988-2fldqciks5d038o7i2qrbvssoa7entnt.apps.googleusercontent.com"
);
async function googleVerifyToken(req, res, next) {
  try {
    const token = req.body.token;

    // 设置 OAuth2 客户端凭证
    client.setCredentials({ access_token: token });

    // 请求用户信息
    const userinfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    // 将用户信息保存到 req 对象中，传递到下一个中间件
    req.User = userinfo.data;

    // 调用 next() 以继续处理请求
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
}

// 修正路由路径
app.post("/google-signin", googleVerifyToken, function (req, res) {
  res.send({ message: "Google sign-in success", user: req.User });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
