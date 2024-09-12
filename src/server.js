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
import { google } from "googleapis";

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

app.use(ErrorHandler);

const client = new OAuth2Client(
  "80477468988-2fldqciks5d038o7i2qrbvssoa7entnt.apps.googleusercontent.com"
);

async function googleVerifyToken(request, response, next) {
  try {
    const token = request.body.token;

    // 設定 client credentials
    client.setCredentials({ access_token: token });

    // 请求用户信息
    const userinfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    request.User = userinfo.data;

    //這個有頭像圖片 但沒有電話
    // console.log(`request.User: ${JSON.stringify(request.User)}`);

    const peopleService = google.people({ version: "v1", auth: client });
    const peopleInfo = await peopleService.people.get({
      resourceName: "people/me",
      personFields: "names,emailAddresses,phoneNumbers",
    });

    // console.log("People API Response:", peopleInfo.data);
    request.User.phoneNumbers = peopleInfo.data.phoneNumbers;
    // console.log(`request.User: ${JSON.stringify(request.User)}`);

    next();
  } catch (error) {
    console.error("Error during Google API request:", error);
    response.status(401).send({ error: "Invalid token" });
  }
}

// 修正路由路径
app.post("/api/googlesignin", googleVerifyToken, function (request, response) {
  response.send({ message: "Google sign-in success", user: request.User });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行`);
});
