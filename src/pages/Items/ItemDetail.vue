<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <div class="mt-5">
    <h3>物品詳情</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div>{{ item.id }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.detail }}</div>
        <div>{{ item.price }}</div>
        <div>{{ item.stock }}</div>
        <div>{{ item.category }}</div>
        <div>{{ item.status }}</div>
      </li>
    </ul>
  </div>

  <div class="col-12 mt-5">
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
        14吋 兒童鋼製自行車 (塗鴉款/附輔助輪) DISCOVER 500
      </p>
      <p class="fs-5 fw-bolder">$2,999</p>

      <div class="mb-3">
        <div>
          <!-- 放棄放在同一行 -->
          <span>購買數量: </span>
          <NumberInputComponent />
        </div>

        <!-- TODOError: 目前還沒有即時更新 -->
        <!-- <div>剩餘庫存: {{ item.stock }}</div> -->
      </div>
      <div class="w-100 d-flex justify-content-between mb-3">
        <button class="btn btn-danger col-5">加入購物車</button>
        <button class="btn btn-outline-danger col-5">立即購買</button>
      </div>

      <div class="fs-5 fw-bolder">商品描述</div>
      <div class="">
        一款簡單又堅固、附輔助輪的 14" 自行車。一款簡單又堅固、附輔助輪的 14"
        自行車。適合身高 90-110 cm 兒童的 14"
        單速自行車，配有輔助輪及簡單的鏈條保護罩。附有輔助輪，擋泥板、腳撐需另購。
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import SmallHeaderComponent from "../../components/SmallHeaderComponent.vue";
import SwiperComponent from "../../components/SwiperComponent.vue";
import NumberInputComponent from "../../components/NumberInputComponent.vue";
import axios from "axios";

export default {
  //為了不要讓warning跑出來 不要註解掉
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      item: null,
    };
  },
  async mounted() {
    const itemId = this.$route.params.id;
    await this.FetchItemDetails(itemId);
  },
  methods: {
    async FetchItemDetails(id) {
      console.log(`FetchItemDetails: ${id}`);
      try {
        // 與post不同 get需要將資料顯示在url上 隱私較差 但速度比post稍快 適用於讀取數據
        const response = await axios.get(
          `http://localhost:3000/api/item/${id}`
        );
        console.log(response.data.item);
        this.item = response.data.item;
      } catch (error) {
        alert("取得物品資訊失敗", error);
      }
    },
    Back() {
      this.$router.go(-1);
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
