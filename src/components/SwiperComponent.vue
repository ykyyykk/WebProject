<template>
  <!-- TODOWarning: 會隨著寬度等比例縮放 -->
  <!-- TODOWarning: 在每個tag 都加v-touch:pan 會warning暫時刪掉 -->
  <!-- TODOWarning: 在swiper加入v-touch:pinch 會Warning暫時刪掉 -->
  <swiper
    :cssMode="true"
    :navigation="true"
    :pagination="true"
    :mousewheel="true"
    :keyboard="true"
    :modules="modules"
    class="mySwiper w-100 border border-1 z-0"
    style="height: 25rem"
  >
    <!-- z-0為了不擋到SearchInput -->

    <!-- TODOWarning: Mac有正常滑動 但是沒有滑鼠拖曳 -->
    <!-- <swiper-slide -->
    <!-- class="d-flex justify-content-center align-items-center text-center" -->
    <!-- > -->
    <!-- 左右會留空 -->
    <!-- <img class="object-fit-contain" src="../assets/img/slide1.jpg" /> -->
    <!-- 上下被裁切 -->
    <!-- <img class="object-fit-cover" src="../assets/img/slide1.jpg" /> -->
    <!-- 被壓縮 -->
    <!-- <img class="object-fit-fill" src="../assets/img/slide1.jpg" /> -->
    <!-- 左右會留空 -->
    <!-- <img class="object-fit-scale" src="../assets/img/slide1.jpg" /> -->
    <!-- 上下左右都被裁切 -->
    <!-- <img class="object-fit-none" src="../assets/img/slide1.jpg" /> -->
    <!-- </swiper-slide> -->

    <swiper-slide
      v-for="page in pages"
      :key="page"
      class="d-flex justify-content-center align-items-center text-center"
      ><img :src="page.src" class="d-block w-100 h-100 object-fit-contain" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default {
  props: {
    pages: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
    };
  },
};
</script>
