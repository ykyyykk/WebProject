import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/Issue", async (request, response, next) => {
  try {
    const apiResponse = await axios.post(
      "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue",
      request.body
    );
    console.log(apiResponse.data);
    response.status(200).send(apiResponse.data); // 傳回結果
  } catch (error) {
    console.error(`API 呼叫失敗: ${error}`);
    response.status(500).send(`API 呼叫失敗: ${error}`);
    next(error);
  }
});

export default router;
