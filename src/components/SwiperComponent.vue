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
    class="mySwiper w-100 border border-1"
    style="height: 25rem"
  >
    <!-- TODOWarning: Mac有正常滑動 但是沒有滑鼠拖曳 -->
    <swiper-slide
      class="d-flex justify-content-center align-items-center text-center"
      >Slide 1</swiper-slide
    >
    <swiper-slide
      class="d-flex justify-content-center align-items-center text-center"
      >Slide 2</swiper-slide
    >
    <swiper-slide
      class="d-flex justify-content-center align-items-center text-center"
      >Slide 3</swiper-slide
    >
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default {
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

<style scoped>
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
