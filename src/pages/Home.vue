<template>
  <ElevatorComponent />
  <HeaderComponent />
  <div class="d-flex">
    <SwiperComponent :pages="pages" />

    <!-- TODO: 這邊改Swiper 上下滑 三張圖片 -->
    <div style="width: 500px" class="d-lg-block d-none">
      <a href="https://www.sinya.com.tw/events/detail/">
        <img src="../../public/events500_160/event1.png" />
      </a>
      <a href="https://www.sinya.com.tw/events/detail/">
        <img src="../../public/events500_160/event2.png" />
      </a>
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
        <a
          href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-silverstone-new/"
        >
          <img src="../../public/leftside/silverstone-202012.png" />
        </a>
        <a href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-nzxt-new/">
          <img src="../../public/leftside/nzxt-202005.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-apexgaming-new/"
        >
          <img src="../../public/leftside/apexgaming-201903.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/welcome-to-coolpc/coolpc-ttesport-new/"
        >
          <img src="../../public/leftside/tt-repair-1607.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-thermaltake-new/"
        >
          <img src="../../public/leftside/tt-psu-repair-1703.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/mother-boring/coolpc-asrock-new/"
        >
          <img src="../../public/leftside/asrock-repair-1502.png" />
        </a>
        <a href="https://www.coolpc.com.tw/tw/shop/router/coolpc-totolink-new/">
          <img src="../../public/leftside/totolink-repair-1302.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-fsp-antec-new/"
        >
          <img src="../../public/leftside/antec-repair-1305.png" />
        </a>
        <a
          href="https://www.coolpc.com.tw/tw/shop/man-power/coolpc-fsp-antec-new/"
        >
          <img src="../../public/leftside/fsp-repair-1305.png" />
        </a>
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
        <a
          href="https://wixtwservice.wixsite.com/sinya/microsoft?utm_term=%E5%BE%AE%E8%BB%9F+windows11+microsoft&utm_content=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95&utm_campaign=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95"
        >
          <img style="max-width: 133px" src="../../public/ads300_600/ad1.png" />
        </a>
        <a
          href="https://www.ctbcbank.com/content/dam/cdn/long/creditcard/new3Cplatform/index.html"
        >
          <img src="../../public/ads133_133/ad1.png" />
        </a>
        <a href="https://line.me/R/ti/p/@629gtlzk?oat_content=url&ts=07191747">
          <img src="../../public/ads133_133/ad2.png" />
        </a>
        <a
          href="https://www.easycard.com.tw/offer?cls=1506473490,1506473503,1508721809,1508721884,&id=1718354939"
        >
          <img src="../../public/ads133_133/ad3.png" />
        </a>
        <a href="https://gnn.gamer.com.tw/detail.php?sn=265638">
          <img src="../../public/ads133_133/ad4.png" />
        </a>
        <a href="https://www.facebook.com/sinyafan/posts/758541392965582">
          <img src="../../public/ads133_133/ad5.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import ElevatorComponent from "../components/ElevatorComponent.vue";
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
  },
  computed: {
    ...mapState(["items", "pages", "events"]),
  },
};
</script>

<style>
/* 背景漸層會重複 */
/* body {
  background-image: linear-gradient(to bottom right, #353535, #000000);
} */
</style>
