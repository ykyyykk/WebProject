<template>
  <div
    v-if="popupShow"
    @click="HidePopup()"
    class="z-3 position-fixed w-100 vh-100 d-flex justify-content-center align-items-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
  >
    <!-- TODOError: 醜八怪 太醜了但功能很重要 所以放Error-->
    <div class="text-center text-white">已加入購物車</div>
  </div>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <!-- v-if不能省略 因為item.name的執行順序會比this.item = response.data.items; 還快 會error -->
  <div v-if="item" class="col-12 mt-5">
    <SwiperComponent
      :pages="[
        // 取得這個id所有圖片
        { src: `/publicdsd/${item.imageUrl}` },
        { src: `/public/${item.imageUrl}` },
      ]"
    />

    <div class="p-3">
      <p class="fs-5 fw-bolder">
        {{ item.name }}
      </p>
      <p class="fs-5 fw-bolder">${{ item.price }}</p>

      <div class="mb-3">
        <div>
          <!-- 放棄放在同一行 -->
          <span>購買數量: </span>
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
        <button class="btn btn-outline-danger col-5">立即購買</button>
      </div>

      <div class="fs-5 fw-bolder">商品描述</div>
      <div>
        {{ item.detail }}
      </div>
    </div>
  </div>
  <div v-else class="bg-black text-white">載入中...</div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      item: "",
      amount: 1,
      popupShow: false,
    };
  },
  async mounted() {
    const itemID = this.$route.params.id;
    await this.FetchItemDetails(itemID);
  },
  computed: {
    ...mapGetters(["isLogin", "getUserID", "getItems"]),
  },
  methods: {
    async FetchItemDetails(id) {
      // console.log(`FetchItemDetails: ${id}`);
      try {
        // 與post不同 get需要將資料顯示在url上 隱私較差 但速度比post稍快 適用於讀取數據
        const response = await axios.get(
          `http://localhost:3000/api/item/${id}`
        );
        // console.log(response.data);
        console.log(response.data.item);
        this.item = response.data.item;
        // console.log(this.item);
      } catch (error) {
        alert("取得物品資訊失敗", error);
      }
    },
    async AddToCart() {
      console.log("加入購物車");
      // if (!this.isLogin) {
      //   alert("請先登入再加入購物車");
      //   return;
      // }
      try {
        console.log(`amount: ${this.amount}`);
        const response = await axios.post(
          "http://localhost:3000/api/addtocart",
          {
            itemID: this.item.id,
            userID: this.getUserID,
            amount: this.amount,
          }
        );
        this.popupShow = true;
      } catch (error) {
        alert("新增至購物車失敗", error);
      }
    },
    ShowPopup() {
      this.popupShow = true;
    },
    HidePopup() {
      this.popupShow = false;
    },
  },
  components: {
    HeaderComponent,
    SmallHeaderComponent,
    SwiperComponent,
    NumberInputComponent,
  },
};
</script>
