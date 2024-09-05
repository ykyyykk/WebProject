<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <!-- v-if不能省略 因為item.name的執行順序會比this.item = response.data.items; 還快 會error -->
  <div v-if="item" class="col-12 mt-5">
    <!-- <div class="mt-5">
      <h3>物品詳情</h3>
      <div>物品ID:{{ item.id }}</div>
      <div>物品名稱:{{ item.name }}</div>
      <div>物品資訊:{{ item.detail }}</div>
      <div>物品價格: {{ item.price }}</div>
      <div>物品庫存: {{ item.stock }}</div>
      <div>物品分類: {{ item.category }}</div>
      <div>物品狀態: {{ item.status }}</div>
      <div>會員ID: {{ userId }}</div>
    </div> -->

    <div class="swiper mySwiper mb-3" style="height: 25rem">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="p-2">
      <p class="fs-5 fw-bolder">
        {{ item.name }}
      </p>
      <p class="fs-5 fw-bolder">${{ item.price }}</p>

      <div class="mb-3">
        <div>
          <!-- 放棄放在同一行 -->
          <span>購買數量: </span>
          <!-- 還沒成功 讀取到變更的amount -->
          <NumberInputComponent v-model="this.amount" :max="item.stock" />
        </div>

        <!-- TODOError: 目前還沒有即時更新 -->
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
import HeaderComponent from "../../components/HeaderComponent.vue";
import SmallHeaderComponent from "../../components/SmallHeaderComponent.vue";
import SwiperComponent from "../../components/SwiperComponent.vue";
import NumberInputComponent from "../../components/NumberInputComponent.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      item: "",
      amount: 1,
    };
  },
  async mounted() {
    const itemId = this.$route.params.id;
    await this.FetchItemDetails(itemId);
  },
  computed: {
    ...mapGetters(["isLogin", "userId", "getItems"]),
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
        // console.log(response.data.item);
        this.item = response.data.item;
        // console.log(this.item);
      } catch (error) {
        alert("取得物品資訊失敗", error);
      }
    },
    async AddToCart() {
      console.log("加入購物車");
      console.log(`userId: ${this.userId}`);
      // if (!this.isLogin) {
      //   alert("請先登入再加入購物車");
      //   return;
      // }
      try {
        console.log(this.item.id);
        console.log(this.userId);
        console.log(this.amount);
        const response = await axios.post(
          "http://localhost:3000/api/addtocart",
          {
            itemId: this.item.id,
            userId: this.userId,
            amount: this.amount,
          }
        );
      } catch (error) {
        alert("新增至購物車失敗", error);
      }
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
