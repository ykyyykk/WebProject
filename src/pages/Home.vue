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

export default {
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
};
</script>

<style>
/* TODO: 背景漸層會重複 */
/* body {
  background-image: linear-gradient(to bottom right, #353535, #000000);
} */
</style>
