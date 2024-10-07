<template>
  <ElevatorComponent />
  <div class="d-flex">
    <SwiperComponent :pages="pages" :showNavigation="true" />

    <div style="width: 500px" class="d-lg-block d-none">
      <div v-for="ad in this.events" :key="ad">
        <ImageLinkComponent :obj="ad" />
      </div>
    </div>
  </div>

  <div class="px-md-5 px-0">
    <div class="d-flex w-100 m-0">
      <!-- 左側廣告欄 -->
      <div class="d-md-block d-none mt-3 col">
        <img
          style="max-width: 133px"
          src="../../public/leftside/goodService.png"
        />
        <div v-for="ad in this.leftSideAd" :key="ad">
          <ImageLinkComponent :obj="ad" />
        </div>
      </div>

      <!-- 中間物品欄 -->
      <div
        class="row d-flex justify-content-start align-items-center w-100 m-0 mt-3"
      >
        <!-- 測試用為了看到 url -->
        <!-- <h1>this.url: {{ this.url }}</h1> -->
        <div
          v-for="item in items"
          :key="item.id"
          class="col-xl-3 col-lg-4 col-6"
        >
          <!-- TODO: 圖片高度太低 在首頁的格子會不一樣大 -->
          <ItemComponent :item="item" />
        </div>
      </div>

      <!-- TODORWD: 捲動時會跟著移動 -->
      <div class="d-sm-block d-none mt-3 col">
        <SwiperComponent
          style="max-width: 133px"
          :pages="rightSwiper"
          :showNavigation="false"
        />
        <div v-for="ad in this.rightSideAd" :key="ad">
          <ImageLinkComponent :obj="ad" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperComponent from "../components/SwiperComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import ElevatorComponent from "../components/ElevatorComponent.vue";
import ImageLinkComponent from "../components/ImageLinkComponent.vue";
import { mapState } from "vuex/dist/vuex.cjs.js";
import CryptoJS from "crypto-js";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default {
  data() {
    return {
      json: null,
      merchantID: "2000132",
      hashKey: "ejCk326UnaZWKisg",
      hashIV: "q9jcZX8Ib9LM8wYk",
      // 這邊的MerchantID不知道怎麼字串的情況下賦值
      // this.data.MerchantID = this.merchantID; 這樣會Error
      // Cannot create property 'MerchantID' on string
      data: `{
        MerchantID: "2000132",
        RelateNumber: "ueikxnqoxlapenrkxurmwonsi",
        Print: "0",
        Donation: "1",
        TaxType: "3",
        SalesAmount: 1000,
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
            ItemCount: 2,
            ItemWord: "個",
            ItemPrice: 20,
            ItemAmount: 20,
          },
        ],
        InvType: "07"
      }`,
    };
  },
  components: {
    SwiperComponent,
    ItemComponent,
    ElevatorComponent,
    ImageLinkComponent,
  },
  computed: {
    ...mapState([
      "items",
      "pages",
      "events",
      "leftSideAd",
      "rightSideAd",
      "rightSwiper",
    ]),
  },
  async mounted() {
    await this.Issue();
  },
  methods: {
    async Issue() {
      try {
        const now = new Date();
        //這裡面亂的Key亂打也會造成錯誤
        this.json = {
          MerchantID: this.merchantID,
          RqHeader: {
            Timestamp: +this.GetTimestamp(now),
          },
          Data: "",
        };

        // console.log(this.data);
        const encryptData = this.GetEncrypData(this.data);
        this.json.Data = encryptData;

        const response = await axios.post(`${API_BASE_URL}/api/Issue`);
        console.log(response);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    GetTimestamp(now) {
      // console.log(`GetTimestamp: ${Math.floor(now / 1000)}`);
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
      // console.log("file: Home.vue:102  mounted  encryptAES: ", encryptAES);
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
        // }).toString();
      }).toString(CryptoJS.enc.Utf8);
      console.log("file: Home.vue:119  mounted  decryptAES: ", decryptAES);

      const decode = decodeURIComponent(decryptAES);
      console.log("decode");
      console.log(decode);
      return decode;
    },
  },
};
</script>

<style>
/* TODO: 背景漸層會重複 */
/* body {
  background-image: linear-gradient(to bottom right, #353535, #000000);
} */
</style>
