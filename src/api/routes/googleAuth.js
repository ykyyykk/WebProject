import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import express from "express";

const router = express.Router();

router.post("/googlesignin", async (request, response) => {
  try {
    const token = request.body.token;

    // console.log(token);
    const client = new OAuth2Client(
      "80477468988-2fldqciks5d038o7i2qrbvssoa7entnt.apps.googleusercontent.com"
    );

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

    // TODO: 聽說google登入的token 好像是 response 還是 request 的 credential
    console.log("People API Response:", peopleInfo.data);
    request.User.phoneNumbers = peopleInfo.data.phoneNumbers;
    console.log(`request.User: ${JSON.stringify(request.User)}`);

    response.send({ message: "Google sign-in success", user: request.User });
  } catch (error) {
    console.error(`Error during Google API request: ${error}`);
    response.status(401).send({ error: "Invalid token" });
  }
});

router.post("/googleregister", async (request, response) => {
  try {
    const token = request.body.token;

    const client = new OAuth2Client(
      "80477468988-2fldqciks5d038o7i2qrbvssoa7entnt.apps.googleusercontent.com"
    );

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

    response.send({ message: "Google sign-in success", user: request.User });
  } catch (error) {
    console.error("Error during Google API request:", error);
    response.status(401).send({ error: "Invalid token" });
  }
});
export default router;
