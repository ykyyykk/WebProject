<template>
  <swiper
    :cssMode="true"
    :navigation="showNavigation && pages.length > 1"
    :pagination="pages.length > 1"
    :mousewheel="true"
    :keyboard="true"
    :modules="modules"
    :loop="pages.length > 1"
    class="mySwiper shadow-sm w-100 z-0"
    style="height: 20rem"
    @swiper="OnSwiper"
    @slideChange="OnSlideChange()"
    @mouseenter="PauseAutoplay"
    @mouseleave="ResumeAutoplay"
  >
    <!-- OnSwiper(this) 也沒用 還是會Error -->
    <!-- z-0為了不擋到SearchInput -->
    <swiper-slide
      v-for="page in pages"
      :key="page"
      class="d-flex justify-content-center align-items-center text-center"
    >
      <div
        v-if="pages.length > 1"
        ref="progressBar"
        class="bg-primary w-0 position-absolute bottom-0 start-0"
        style="height: 4px"
      ></div>
      <img :src="page.src" class="d-block w-100 h-100 object-fit-contain" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import anime from "animejs/lib/anime.es.js";

export default {
  setup() {
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
    };
  },
  props: {
    pages: {
      type: Array,
      required: true,
    },
    showNavigation: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperInstance: null,
      progressAnimation: null,
    };
  },
  methods: {
    OnSwiper(swiper) {
      this.swiperInstance = swiper;
      if (this.pages.length > 1) {
        this.AnimateProgressBar();
      }
    },
    OnSlideChange() {
      if (this.pages.length > 1) {
        this.ResetProgress();
      }
    },
    NextImage() {
      if (this.pages.length > 1) {
        this.ResetProgress();
        if (this.swiperInstance) {
          this.swiperInstance.slideNext();
        }
      }
    },
    PreviousImage() {
      if (this.pages.length > 1) {
        this.ResetProgress();
        if (this.swiperInstance) {
          this.swiperInstance.slidePrev();
        }
      }
    },
    ResetProgress() {
      if (this.progressAnimation) {
        this.progressAnimation.pause();
        this.progressAnimation.seek(0);
      }
      this.AnimateProgressBar();
    },
    AnimateProgressBar() {
      if (this.pages.length > 1) {
        this.progressAnimation = anime({
          targets: this.$refs.progressBar,
          width: "100%",
          duration: 3000,
          easing: "linear",
          complete: () => {
            this.NextImage();
          },
        });
      }
    },
    PauseAutoplay() {
      if (this.progressAnimation && this.pages.length > 1) {
        this.progressAnimation.pause();
      }
    },
    ResumeAutoplay() {
      if (this.progressAnimation && this.pages.length > 1) {
        this.progressAnimation.play();
      }
    },
  },
};
</script>

<!-- 左右會留空 -->
<!-- <img class="object-fit-contain" src="../assets/img/slide1.jpg" /> -->
<!-- <img class="object-fit-scale" src="../assets/img/slide1.jpg" /> -->
<!-- 上下被裁切 -->
<!-- <img class="object-fit-cover" src="../assets/img/slide1.jpg" /> -->
<!-- 被壓縮 -->
<!-- <img class="object-fit-fill" src="../assets/img/slide1.jpg" /> -->
<!-- 上下左右都被裁切 -->
<!-- <img class="object-fit-none" src="../assets/img/slide1.jpg" /> -->

<!-- TODORWD: 會隨著寬度等比例縮放 -->
<!-- TODOWarning: Mac有正常滑動 但是沒有滑鼠拖曳 -->
<!-- TODOWarning: 在每個tag 都加v-touch:pan 會warning暫時刪掉 -->
<!-- TODOWarning: 在swiper加入v-touch:pinch 會Warning暫時刪掉 -->
<!-- TODOAdd: 廣告XS 一次一張 LG一次兩張-->
