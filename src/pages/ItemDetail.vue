<template>
  <!-- Qvg&6&)MFu29R+? -->
  <PopupComponent />
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <!-- v-if不能省略 因為item.name的執行順序會比this.item = response.data.items; 還快 會error -->

  <div v-if="item" class="d-flex justify-content-center mt-5">
    <div class="p-3 col-sm-10 col-12">
      <div class="shadow p-3 mb-3 placeholder-glow">
        <SwiperComponent :pages="this.pages" />
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
          <button @click="AddToCart()" class="btn btn-danger col-5">
            加入購物車
          </button>
          <button @click="Buy()" class="btn btn-outline-danger col-5">
            立即購買
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
  <!-- TODO:不懂為什麼 用了沒辦法換行 https://getbootstrap.com/docs/5.3/components/placeholders/ -->
  <!-- <div class="bg-black text-white">載入中...</div> -->
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import PopupComponent from "../components/PopupComponent.vue";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";
import { EventBus } from "../utils/eventBus.js";

export default {
  data() {
    return {
      item: "",
      amount: 1,
      pages: [],
      selectImageName: "",
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
    GetThumbnail(thumbnail, category) {
      if (thumbnail != "") {
        return null;
      }
      switch (category) {
        case "處理器":
          return "img/CPU.jpg";
        case "主機板":
          return "img/MB.jpg";
        case "記憶體":
          return "img/Ram.jpg";
        case "硬碟":
          return "img/HDD.jpg";
        case "顯示卡":
          return "img/GPU.jpg";
      }
      return;
    },
    async GetItemImage(id, thumbnail, category) {
      // 為了不讓同一張圖片出現兩次
      if (this.GetThumbnail(thumbnail, category) != null) {
        this.pages.push({
          src: `/public/${this.GetThumbnail(thumbnail, category)}`,
        });
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/getitemimage`, {
          itemID: id,
        });

        // 當找不到image時
        if (response.data.items === undefined) {
          return;
        }

        const responseItems = response.data.items;
        for (let i = 0; i < responseItems.length; i++) {
          this.pages.push({ src: `/public/img/${responseItems[i].imageUrl}` });
        }
      } catch (error) {
        alert(`取得商品圖片失敗: ${error}`);
      }
    },
    async FetchItemDetails(id) {
      try {
        // 與post不同 get需要將資料顯示在url上 隱私較差 但速度比post稍快 適用於讀取數據
        const response = await axios.get(`${API_BASE_URL}/api/item/${id}`);

        this.item = response.data.item;
      } catch (error) {
        alert("取得物品資訊失敗", error);
      }
      this.GetItemImage(this.item.id, this.item.thumbnail, this.item.category);
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

        if (response.data.success) {
          console.log(`成功購買`);
        }
        this.item.stock -= this.amount;
        EventBus.emit("showPopup", "已購買");
        // this.show = true;
        // TODO: 綠界購買等Google登入解決在做
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
  },
  components: {
    HeaderComponent,
    SmallHeaderComponent,
    SwiperComponent,
    NumberInputComponent,
    PopupComponent,
  },
};
</script>

<style>
#scroll {
  /* 全域讓預設ScorllBar 瘦一點好看點 */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

#scroll::-webkit-scrollbar {
  width: 12px;
}

#scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

#scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}

#scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
