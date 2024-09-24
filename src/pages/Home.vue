<template>
  <ElevatorComponent />
  <HeaderComponent />
  <div class="d-flex">
    <SwiperComponent :pages="pages" />

    <!-- TODOWarning: 這邊改Swiper 上下滑 三張圖片 -->
    <div style="width: 500px" class="d-lg-block d-none">
      <div v-for="ad in this.events" :key="ad">
        <ImageLinkComponent :obj="ad" />
      </div>
    </div>
  </div>

  <div class="px-md-5 px-0">
    <!-- https://wixtwservice.wixsite.com/sinya/microsoft?utm_term=%E5%BE%AE%E8%BB%9F+windows11+microsoft&utm_content=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95&utm_campaign=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95 -->

    <!-- 沒用 要先裝popover插件 -->
    <!-- <button
    type="button"
    class="btn btn-lg btn-danger"
    data-bs-toggle="popover"
    data-bs-title="Popover title"
    data-bs-content="And here's some amazing content. It's very engaging. Right?"
    >
    Click to toggle popover
  </button> -->

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
          <ItemComponent :item="item" />
        </div>
      </div>

      <!-- TODO: 捲動時會跟著移動 -->
      <div class="d-sm-block d-none mt-3 col">
        <!-- TODO: 這邊改swiper 左右滑 只有兩張圖片 -->
        <!-- TODO: 不管max-width放在哪 都沒辦法第一張的限制寬度 -->
        <a
          href="https://wixtwservice.wixsite.com/sinya/microsoft?utm_term=%E5%BE%AE%E8%BB%9F+windows11+microsoft&utm_content=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95&utm_campaign=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95"
        >
          <img style="max-width: 133px" src="../../public/ads300_600/ad1.png" />
        </a>
        <div v-for="ad in this.rightSideAd" :key="ad">
          <ImageLinkComponent :obj="ad" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import ElevatorComponent from "../components/ElevatorComponent.vue";
import ImageLinkComponent from "../components/ImageLinkComponent.vue";
import { mapState } from "vuex/dist/vuex.cjs.js";
// import { API_BASE_URL } from "../config/api";

export default {
  // data() {
  //   return {
  //     url: `${API_BASE_URL}`,
  //   };
  // },
  components: {
    HeaderComponent,
    SwiperComponent,
    ItemComponent,
    ElevatorComponent,
    ImageLinkComponent,
  },
  computed: {
    ...mapState(["items", "pages", "events", "leftSideAd", "rightSideAd"]),
  },
};
</script>

<style>
/* 背景漸層會重複 */
/* body {
  background-image: linear-gradient(to bottom right, #353535, #000000);
} */
</style>
