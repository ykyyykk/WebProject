<template>
  <!-- TODOWarning: 會隨著寬度等比例縮放 -->
  <!-- TODOWarning: Mac有正常滑動 但是沒有滑鼠拖曳 -->
  <!-- TODOWarning: 在每個tag 都加v-touch:pan 會warning暫時刪掉 -->
  <!-- TODOWarning: 在swiper加入v-touch:pinch 會Warning暫時刪掉 -->
  <!-- TODOAdd: 設定秒數 自動輪播 -->
  <!-- TODOAdd: 廣告XS 一次一張 LG一次兩張-->
  <swiper
    :cssMode="true"
    :navigation="true"
    :pagination="true"
    :mousewheel="true"
    :keyboard="true"
    :modules="modules"
    class="mySwiper shadow-sm w-100 z-0"
    style="height: 20rem"
  >
    <!-- z-0為了不擋到SearchInput -->

    <!-- 左右會留空 -->
    <!-- <img class="object-fit-contain" src="../assets/img/slide1.jpg" /> -->
    <!-- <img class="object-fit-scale" src="../assets/img/slide1.jpg" /> -->
    <!-- 上下被裁切 -->
    <!-- <img class="object-fit-cover" src="../assets/img/slide1.jpg" /> -->
    <!-- 被壓縮 -->
    <!-- <img class="object-fit-fill" src="../assets/img/slide1.jpg" /> -->
    <!-- 上下左右都被裁切 -->
    <!-- <img class="object-fit-none" src="../assets/img/slide1.jpg" /> -->

    <swiper-slide
      v-for="page in pages"
      :key="page"
      class="d-flex justify-content-center align-items-center text-center"
    >
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

<!-- Carousel.js -->
<!-- let images = [
  "",
  "image/1.jpg",
  "image/2.jpg",
  "image/3.jpg",
  "image/4.jpg",
  "image/5.jpg",
]; /* ImageURL */

var currentIndex = 0;
// 5秒
var changeDuration = 3000;
var animation;
var lastImgElement;
var player;

function animationInit() {
  animation = anime({
    targets: "#fill",
    width: "100%",
    easing: "linear",
    duration: changeDuration,
    autoplay: false,
    complete: () => {
      $("#fill").css("width", "0%");
      nextImage();
    },
  });
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("trailer", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

// 不知道為什麼 有的時候 沒有""會Error
$(document).ready(() => {
  checkIndexShowImage();
  ButtonInit();
  animationInit();
  onYouTubeIframeAPIReady();
  animation.play();

  $("#big_img").on("mouseenter", () => {
    animation.pause();
  });

  $("#big_img").on("mouseleave", () => {
    animation.play();
  });
});

function updateImage(carouselIndex) {
  // 避免手動選第三張 在按下一張的index不對
  currentIndex = carouselIndex;
  // console.log(currentIndex);
  checkIndexShowImage();

  $("#big_img").attr("src", images[currentIndex]);
  // ChangeFoucusBorder(currentIndex);

  animation.reset();
  animation.play();
}

function nextImage() {
  currentIndex++;
  currentIndex = currentIndex >= images.length ? 0 : currentIndex;
  updateImage(currentIndex);
}

function previousImage() {
  currentIndex--;
  currentIndex = currentIndex < 0 ? images.length - 1 : currentIndex;
  updateImage(currentIndex);
}

function ButtonInit() {
  $("#nextPageBtn").on("click", () => {
    nextImage();
  });
  $("#previousPageBtn").on("click", () => {
    previousImage();
  });
}

function checkIndexShowImage() {
  if (currentIndex != 0) {
    $("#trailer").css("display", "none");
    $("#big_img").css("display", "block");
  } else {
    $("#trailer").css("display", "block");
    $("#big_img").css("display", "none");
  }
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    animation.pause();
    return;
  }
  animation.play();
}

function ChangeFoucusBorder(currentIndex) {
  $(`#carousel${currentIndex}`).addClass("border border-2 border-primary");
  if ($(lastImgElement) != undefined) {
    $(lastImgElement).removeClass("border border-2 border-primary");
  }
  lastImgElement = $(`#carousel${currentIndex}`);
} -->

<!-- ScrollButton.js -->
<!-- var scroll_to_top_btn;
var scroll_to_bottom_btn;

document.addEventListener("DOMContentLoaded", () => {
  scroll_to_top_btn = document.getElementById("ScrollToTop");
  scroll_to_bottom_btn = document.getElementById("ScrollToBottom");

  scroll_to_top_btn.addEventListener("click", () => {
    console.log("scroll to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth" /* 平滑捲動 */,
    });
  });

  scroll_to_bottom_btn.addEventListener("click", () => {
    console.log("scroll to bottom");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
}); -->
