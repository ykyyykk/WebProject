<template>
  <button @click="Issue()" class="btn btn-outline-danger col">
    綠界開發票測試
  </button>
</template>

<script>
import { mapState } from "vuex/dist/vuex.cjs.js";
import CryptoJS from "crypto-js";
import axios from "axios";
import {
  API_BASE_URL,
  Issue_MERCHANTID,
  Issue_HASHKEY,
  Issue_HASHIV,
} from "../config/api";

export default {
  data() {
    return {
      data: {
        MerchantID: "",
        RelateNumber: "",
        CustomerName: "", // print == 1 時必填
        CustomerAddr: "address", // print == 1 時必填
        CustomerPhone: "0954074430", // print == 1 時必填
        CustomerEmail: "louise87276@gmail.com", // print == 1 時必填
        Print: "1",
        Donation: "0",
        TaxType: "1",
        InvType: "07",
        vat: "1",
        SalesAmount: 70, // 總價
        Items: [
          {
            ItemName: "item01",
            ItemCount: 1,
            ItemWord: "件",
            ItemPrice: 50,
            ItemAmount: 50,
          },
          {
            ItemName: "item02",
            ItemCount: 1, // 物品數量
            ItemWord: "個",
            ItemPrice: 20, // 物品價格
            ItemAmount: 20, // itemPrice * itemCount
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async Issue() {
      try {
        const now = new Date();
        //這裡面亂的Key亂打也會造成錯誤
        let json = {
          MerchantID: Issue_MERCHANTID,
          RqHeader: {
            Timestamp: +this.GetTimestamp(now),
          },
          Data: "",
        };

        this.data.MerchantID = Issue_MERCHANTID;
        this.data.RelateNumber = "louise" + this.GetTimestamp(now);
        this.data.CustomerName = this.user.name;
        // console.log(this.data);
        const dataString = JSON.stringify(this.data);
        const encryptData = this.GetEncrypData(dataString);
        json.Data = encryptData;

        // console.log(this.json);
        // 沒辦法從前端call
        const responseData = await axios.post(
          `${API_BASE_URL}/api/Issue`,
          json
        );
        // console.log(responseData.data);
        if (responseData.data.TransCode != "1") {
          alert(`開立發票失敗`);
          return;
        }
        console.log(this.GetDecryptData(responseData.data.Data));
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    GetTimestamp(now) {
      // console.log(`GetTimestamp: ${Math.floor(now / 1000)}`);
      return Math.floor(now / 1000);
    },
    GetEncrypData(data) {
      // https://stackoverflow.com/questions/76585283/nodejs-cryptojs-returns-different-aes-128-cbc-encrypted-value-when-using-cryptoj
      const encode = encodeURIComponent(data);
      const key = CryptoJS.enc.Utf8.parse(Issue_HASHKEY);
      const iv = CryptoJS.enc.Utf8.parse(Issue_HASHIV);

      // key 和 iv 會隨著時間不一樣
      const encryptAES = CryptoJS.AES.encrypt(encode, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(); //不要再toString裡面新增 CryptoJS.enc.Utf8 輸出會是空的的
      // console.log("file: Home.vue:102  mounted  encryptAES: ", encryptAES);
      return encryptAES;
    },
    GetDecryptData(data) {
      const key = CryptoJS.enc.Utf8.parse(Issue_HASHKEY);
      const iv = CryptoJS.enc.Utf8.parse(Issue_HASHIV);

      const decryptAES = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8);
      console.log("file: Home.vue:119  mounted  decryptAES: ", decryptAES);

      const decode = decodeURIComponent(decryptAES);
      return decode;
    },
  },
};
</script>
