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
          <!-- TODO: 不懂為什麼綠界開發票測試一直跑出來 明明已經刪掉了 -->
          <button @click="AddToCart()" class="btn btn-danger col">
            加入購物車
          </button>

          <button @click="Buy()" class="mx-5 btn btn-outline-danger col">
            立即購買
          </button>

          <!-- 為了不要有Warning 才加toString() -->
          <ECPayButtonComponent
            :id="item.id.toString()"
            :name="item.name"
            :price="this.amount * item.price"
            :amount="this.amount"
          />
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
import ECPayButtonComponent from "../components/ECPayButtonComponent.vue";
import B2CInvoiceComponent from "../components/B2CInvoiceComponent.vue";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";
import { EventBus } from "../utils/eventBus.js";
import moment from "moment-timezone";

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
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
  },
  components: {
    SmallHeaderComponent,
    SwiperComponent,
    NumberInputComponent,
    PopupComponent,
    ECPayButtonComponent,
    B2CInvoiceComponent,
  },
};
</script>
