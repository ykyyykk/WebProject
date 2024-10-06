<template>
  <button @click="ECPay()" class="btn btn-outline-danger col">綠界付款</button>
</template>

<script>
import CryptoJS from "crypto-js";
import { API_BASE_URL, MERCHANTID, HASHKEY, HASHIV, HOST } from "../config/api";
import axios from "axios";

export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  methods: {
    async ECPay() {
      try {
        const now = new Date();
        //這裡面亂的Key亂打也會造成錯誤
        this.ParamsBeforeCMV = {
          MerchantID: MERCHANTID,
          MerchantTradeNo: this.SetMerchantTradeNo(now),
          MerchantTradeDate: this.FormatDate(now),
          PaymentType: "aio",
          //這是價格 會影響付款方式的數量 調成100會比較方便使用所有的付款方式
          TotalAmount: this.price,
          StoreID: "aaa",
          TradeDesc: "TradeDesc",
          ItemName: this.name,
          // 付款成功時會call這隻api 用來通知是否付款成功 localhost沒辦法call
          ReturnURL: `${API_BASE_URL}/api/return`,
          // 會在付款成功的頁面顯示一個button 返回商店 按下去後跳轉的網頁
          // 在有設定OrderResultURL的情況下不會出現
          ClientBackURL: HOST,
          // 取代原本的付款成功顯示的頁面 直接設定首頁會405 NotAllowed
          // OrderResultURL: `${API_BASE_URL}/api/return`,
          ChoosePayment: "ALL",
          EncryptType: 1,
          CustomField1: this.id,
          CustomField2: this.amount,
        };

        const form = await this.CreateForm();
        form.submit(); // 自動提交表單
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    async CreateOrder(
      paymentType,
      tradeDate,
      totalAmount,
      itemName,
      checkMacValue,
      merchantTradeNo
    ) {
      const response = await axios.post(`${API_BASE_URL}/api/addorder`, {
        paymentType: paymentType,
        tradeDate: tradeDate,
        totalAmount: totalAmount,
        itemName: itemName,
        checkMacValue: checkMacValue,
        merchantTradeNo: merchantTradeNo,
      });
      console.log(response.data);
    },
    async CreateForm() {
      const form = document.createElement("form");
      form.method = "POST";
      // 正式發布時 需要將網址的-stage給取消掉
      form.action =
        "https://payment-stage.ecpay.com.tw//Cashier/AioCheckOut/V5";

      const CheckMacValue = this.CheckMacValueGen(this.ParamsBeforeCMV);

      Object.keys(this.ParamsBeforeCMV).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = this.ParamsBeforeCMV[key];
        form.appendChild(input);
      });
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "CheckMacValue";
      input.value = CheckMacValue;
      form.appendChild(input);

      document.body.appendChild(form);

      console.log(form);

      await this.CreateOrder(
        form.PaymentType.value,
        form.MerchantTradeDate.value,
        form.TotalAmount.value,
        form.ItemName.value,
        form.CheckMacValue.value,
        form.MerchantTradeNo.value
      );

      return form;
    },
    SetMerchantTradeNo(now) {
      return `od${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
        .getHours()
        .toString()
        .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
        .getSeconds()
        .toString()
        .padStart(2, "0")}${now.getMilliseconds().toString().padStart(3, "0")}`;
    },
    FormatDate(now) {
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    },
    CheckMacValueGen(parameters) {
      let paramString = Object.keys(parameters)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((key) => `${key}=${parameters[key]}`)
        .join("&");
      paramString = `HashKey=${HASHKEY}&${paramString}&HashIV=${HASHIV}`;
      paramString = encodeURIComponent(paramString).toLowerCase();

      // 特殊字符轉換
      paramString = paramString
        .replace(/%20/g, "+")
        .replace(/%2d/g, "-")
        .replace(/%5f/g, "_")
        .replace(/%2e/g, ".")
        .replace(/%21/g, "!")
        .replace(/%2a/g, "*")
        .replace(/%28/g, "(")
        .replace(/%29/g, ")");

      return CryptoJS.SHA256(paramString)
        .toString(CryptoJS.enc.Hex)
        .toUpperCase();
    },
  },
};
</script>
