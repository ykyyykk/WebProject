import express from "express";
import crypto from "crypto";
// 綠界提供的 SDK
import ecpay_payment from "ecpay_aio_nodejs";

const router = express.Router();

const MERCHANTID = "3002607";
const HASHKEY = "pwFHCqoQZGmho4w6";
const HASHIV = "EkRm7iFT261dpevs";
const HOST = "https://www.louise.tw";

// SDK 提供的範例，初始化
// https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
const options = {
  OperationMode: "Test", //Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};
let TradeNo;

router.get("/ecpay", (req, res) => {
  console.log("/ecpay");
  // SDK 提供的範例，參數設定
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  const MerchantTradeDate = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  TradeNo = "test" + new Date().getTime();

  // www.louise.tw:5173/api/return
  // console.log(`original ReturnURL: ${HOST}/return`);
  let base_param = {
    MerchantTradeNo: "f0a0d7e9fae1bb72bc93", //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: new Date().getTime(),
    TotalAmount: "100", //訂單金額
    TradeDesc: "測試交易描述", //訂單描述
    ItemName: "測試商品等", //訂單名稱
    ReturnURL: () => {
      console.log(0);
    },
    ClientBackURL: () => {
      console.log(1);
    },
    // ReturnURL: `http://localhost:5173/`,
    // ClientBackURL: `http://localhost:5173/`,
    // ChoosePayment: "ALL",
    // ReturnURL: `${HOST}/return`,
    // ClientBackURL: `${HOST}/clientReturn`,
  };

  // {"OperationMode":"Test","MercProfile":{"MerchantID":2000132,"HashKey":"pwFHCqoQZGmho4w6","HashIV":"EkRm7iFT261dpevs"},"IgnorePayment":[],"IsProjectContractor":false}
  console.log(`options: ${JSON.stringify(options)}`);
  const create = new ecpay_payment(options);
  // 一堆東西不知道是什麼 裡面還有html
  // console.log(`create: ${JSON.stringify(create)}`);

  // {"MerchantTradeNo":"f0a0d7e9fae1bb72bc93","MerchantTradeDate":1727399003330,"TotalAmount":"100","TradeDesc":"測試交易描述","ItemName":"測試商品等"}
  // console.log(`base_param: ${JSON.stringify(base_param)}`);
  // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
  const html = create.payment_client.aio_check_out_all(base_param);
  console.log(html);

  res.render("index", {
    title: "Express",
    html,
  });
});

// 後端接收綠界回傳的資料
router.post("/return", async (req, res) => {
  console.log("req.body:", req.body);

  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  console.log(
    "確認交易正確性：",
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  );

  // 交易成功後，需要回傳 1|OK 給綠界
  res.send("1|OK");
});

// 用戶交易完成後的轉址
router.get("/clientReturn", (req, res) => {
  console.log("clientReturn:", req.body, req.query);
  // 回到首頁;
  const frontendURL = `http://localhost:5173/?home${new URLSearchParams(
    req.query
  ).toString()}`;
  res.redirect(frontendURL);
});

export default router;
