import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      json: null,
      merchantID: "2000132",
      hashKey: "ejCk326UnaZWKisg",
      hashIV: "q9jcZX8Ib9LM8wYk",
    };
  },
  async mounted() {
    // 懷疑要什麼鬼憑證所以暫停
    await this.GetGovInvoiceWordSetting();
  },
  methods: {
    async GetGovInvoiceWordSetting() {
      try {
        const now = new Date();
        //這裡面亂的Key亂打也會造成錯誤
        this.json = {
          MerchantID: this.merchantID,
          RqHeader: {
            Timestamp: this.GetTimestamp(now),
          },
          Data: "",
        };

        const data = `{ MerchantID: ${this.merchantID}, InvoiceYear: 113 }`;
        this.json.Data = this.GetEncrypData(data);

        const form = await this.CreateForm();
        // form.submit(); // 自動提交表單
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    GetTimestamp(now) {
      console.log(Math.floor(now / 1000));
      return Math.floor(now / 1000);
    },
    GetEncrypData(data) {
      const encode = encodeURIComponent(data);

      // https://stackoverflow.com/questions/76585283/nodejs-cryptojs-returns-different-aes-128-cbc-encrypted-value-when-using-cryptoj
      const key = CryptoJS.enc.Utf8.parse(this.hashKey);
      const iv = CryptoJS.enc.Utf8.parse(this.hashIV);
      // const key = this.hashKey;
      // const iv = this.hashIV;

      // key 和 iv 會隨著時間不一樣
      const encryptAES = CryptoJS.AES.encrypt(encode, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(); //不要再toString裡面新增 CryptoJS.enc.Utf8 輸出會是空的的
      console.log("file: Home.vue:102  mounted  encryptAES: ", encryptAES);
      return encryptAES;
    },
    GetDecryptData(data) {
      const key = CryptoJS.enc.Utf8.parse(this.hashKey);
      const iv = CryptoJS.enc.Utf8.parse(this.hashIV);
      // const key = this.hashKey;
      // const iv = this.hashIV;

      const decryptAES = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8);
      console.log("file: Home.vue:119  mounted  decryptAES: ", decryptAES);

      const decode = decodeURIComponent(decryptAES);
      console.log("file: Home.vue:121  mounted  decode: ", decode);
      return decode;
    },
    async CreateForm() {
      const form = document.createElement("form");
      form.method = "POST";
      // 正式發布時 需要將網址的-stage給取消掉
      form.action =
        "https://einvoice-stage.ecpay.com.tw/B2CInvoice/GetGovInvoiceWordSetting";

      Object.keys(this.json).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = this.json[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);

      console.log(form);

      return form;
    },
  },
};
