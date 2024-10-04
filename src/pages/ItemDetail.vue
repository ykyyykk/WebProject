<template>
  <PopupComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <!-- v-if不能省略 因為item.name的執行順序會比this.item = response.data.items; 還快 會error -->

  <div v-if="item" class="d-flex justify-content-center mt-5">
    <div class="p-3 col-sm-10 col-12">
      <div class="shadow p-3 mb-3 placeholder-glow">
        <SwiperComponent :pages="this.pages" :showNavigation="true" />
        <!-- <div id="scroll" class="d-flex overflow-x-auto overflow-y-hidden mt-3">
          <div v-for="page in this.pages" :key="page" class="position-relative">
            <div
              v-if="selectImageName === page.src"
              class="position-absolute bg-primary z-n1 top-50"
              style="width: 12rem; height: 12rem"
            ></div>
            <button
              @click="SelectImage(page.src)"
              class="rounded border border-0"
            >
              <img :src="page.src" style="width: 10rem; height: 10rem" />
            </button>
          </div>
        </div> -->
        <p class="fs-5 fw-bolder mt-3">
          {{ item.name }}
        </p>
        <p class="fs-5 fw-bolder">${{ item.price }}</p>
        <div class="mb-3">
          <div class="mb-3">
            <!-- 放棄放在同一行 -->
            <p class="mb-3">購買數量:</p>
            <!-- 還沒成功 讀取到變更的amount -->
            <NumberInputComponent
              v-model:amount="this.amount"
              v-model:max="this.item.stock"
            />
          </div>
          <div>剩餘庫存: {{ item.stock }}</div>
        </div>
        <div class="w-100 d-flex justify-content-between mb-3">
          <button @click="AddToCart()" class="btn btn-danger col">
            加入購物車
          </button>
          <button @click="Buy()" class="mx-5 btn btn-outline-danger col">
            立即購買
          </button>
          <button @click="ECPay()" class="btn btn-outline-danger col">
            綠界付款
          </button>
        </div>
      </div>
      <div class="shadow p-3">
        <div class="fs-5 fw-bolder mb-3">商品描述</div>
        <div>
          {{ item.detail }}
        </div>
      </div>
    </div>
  </div>
  <!-- TODOWarning:不懂為什麼 用了沒辦法換行 https://getbootstrap.com/docs/5.3/components/placeholders/ -->
  <!-- <div class="bg-black text-white">載入中...</div> -->
</template>

<script>
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import PopupComponent from "../components/PopupComponent.vue";
import axios from "axios";
import { API_BASE_URL, HASHKEY, HASHIV } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";
import { EventBus } from "../utils/eventBus.js";
import moment from "moment-timezone";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      item: "",
      amount: 1,
      pages: [],
      selectImageName: "",
      ParamsBeforeCMV: {},
    };
  },
  async mounted() {
    const itemID = this.$route.params.id;
    await this.FetchItemDetails(itemID);
  },
  computed: {
    ...mapState(["user", "items"]),
  },
  methods: {
    async FetchItemDetails(id) {
      try {
        // 與post不同 get需要將資料顯示在url上 隱私較差 但速度比post稍快 適用於讀取數據
        const response = await axios.get(`${API_BASE_URL}/api/item/${id}`);

        this.item = response.data.item;
        this.GetItemImage(id, this.item.thumbnail, this.item.category);
      } catch (error) {
        alert("取得物品資訊失敗", error);
      }
    },
    async GetItemImage(id, thumbnail, category) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/getitemimage`, {
          itemID: id,
        });

        // 目前這樣GCE才會正常 當找不到image時
        if (response.data.items === undefined || response.data === null) {
          const imgPath = this.GetThumbnail(thumbnail, category);
          // 目前這樣GCE才會正常
          this.pages.push({ src: `${imgPath}` });
          return;
        }

        const responseItems = response.data.items;
        for (let i = 0; i < responseItems.length; i++) {
          // 目前這樣GCE才會正常
          this.pages.push({ src: `/img/${responseItems[i].imageUrl}` });
        }
      } catch (error) {
        alert(`取得商品圖片失敗: ${error}`);
      }
    },
    GetThumbnail(thumbnail, category) {
      if (thumbnail != "") {
        return null;
      }
      // 目前這樣GCE才會正常
      switch (category) {
        case "處理器":
          return "/img/CPU.jpg";
        case "主機板":
          return "/img/MB.jpg";
        case "記憶體":
          return "/img/Ram.jpg";
        case "硬碟":
          return "/img/HDD.jpg";
        case "顯示卡":
          return "/img/GPU.jpg";
      }
      return;
    },
    async AddToCart() {
      if (this.user == null) {
        alert("請先登入再加入購物車");
        return;
      }
      try {
        await axios.post(`${API_BASE_URL}/api/addtocart`, {
          itemID: this.item.id,
          userID: this.user.id,
          amount: this.amount,
        });
        EventBus.emit("showPopup", "新增至購物車");
      } catch (error) {
        alert("新增至購物車失敗", error);
      }
    },
    SelectImage(imageName) {
      this.selectImageName = imageName;
    },
    async Buy() {
      if (this.user == null) {
        alert("請先登入再加入購物車");
        return;
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/api/purchaseitem`, {
          id: this.item.id,
          amount: this.amount,
        });
        // 測試反向代理 不用 port
        // const response = await axios.post(`/api/purchaseitem`, {
        //   id: this.item.id,
        //   amount: this.amount,
        // });
        console.log(`response: ${response}`);
        if (!response.data.success) {
          return;
        }
        this.item.stock -= this.amount;
        EventBus.emit("showPopup", "已購買");
        await axios.post(`${API_BASE_URL}/api/addrevnue`, {
          date: moment().tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ss"),
          value: +this.item.price * +this.amount,
          id: +this.item.id,
        });
        await axios.post(`${API_BASE_URL}/api/updateuserpriceamount`, {
          userID: this.user.id,
          amount: this.amount,
          price: +this.item.price * +this.amount,
        });
        // TODOWarning: 綠界購買有夠難===========================================
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    ECPay() {
      try {
        //這裡面亂的Key亂打也會造成錯誤
        this.ParamsBeforeCMV = {
          MerchantID: "3002607",
          MerchantTradeNo: "",
          MerchantTradeDate: "",
          PaymentType: "aio",
          TotalAmount: 100, //這是價格 會影響付款方式的數量 調成100會比較方便使用所有的付款方式
          StoreID: "aaa",
          TradeDesc: "this.item.detail",
          ItemName: this.item.name,
          ReturnURL: `${API_BASE_URL}/api/return`,
          // ReturnURL: `${API_BASE_URL}/api/return`, //不能省略
          // ReturnURL: `https://www.louise.tw`, //不會跳轉
          ChoosePayment: "ALL",
          EncryptType: 1,
        };

        const now = new Date();
        this.ParamsBeforeCMV.MerchantTradeNo = this.SetMerchantTradeNo(now);
        this.ParamsBeforeCMV.MerchantTradeDate = this.FormatDate(now);

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

        console.log(form);

        document.body.appendChild(form);
        form.submit(); // 自動提交表單
      } catch (error) {
        alert(`Error: ${error}`);
      }
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
      // console.log(this.HASHKEY);
      // console.log(this.HASHIV);
      paramString = `HashKey=${"pwFHCqoQZGmho4w6"}&${paramString}&HashIV=${"EkRm7iFT261dpevs"}`;
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
  components: {
    SmallHeaderComponent,
    SwiperComponent,
    NumberInputComponent,
    PopupComponent,
  },
};
</script>
