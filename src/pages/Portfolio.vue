<template>
  <main class="" style="height: calc(100vh - 50px)">
    <div class="container-fluid h-100 position-relative">
      <!-- 作品集1遊戲背景圖片 -->
      <!-- <img
        class="w-100 h-100 object-fit-fill position-absolute start-0 z-n1"
        src="/static/header.jpg"
      /> -->

      <!-- 漸層Mask -->
      <div class="position-absolute w-100 h-100 z-0" style="
          background-color: black;
          mask-image: linear-gradient(to right, transparent, black 60%);
        "></div>

      <!-- 作品集1 -->
      <div class="row h-100">
        <!-- 作品集1 左邊 -->
        <div id="left_side" class="col-xxl col-xl col-lg col-md">
          <!-- 連結Group -->
          <div class="d-flex mt-3 flex-xxl-row flex-wrap justify-content-evenly position-relative gap-sm-3 gap-0">
            <GameLinkComponent />
          </div>
        </div>
        <!-- 作品集1 右邊 -->
        <div id="right_side" class="col-xxl col-xl-9 col-lg-9 col-md-9 d-flex justify-content-center">
          <div class="right-side-content w-100">
            <!-- 為了水平置中按鈕所以將img包起來 -->
            <div class="position-relative">
              <!-- style是為了16:9顯示 (9/16 = 0.5625 = 56.25%) -->
              <div class="position-relative w-100 mt-3" style="padding-top: 56.2%">
                <!-- 原始大小600 * 315 -->
                <!-- <img id="big_img" class="position-absolute w-100 h-100 top-0 start-0 rounded-3" src="/static/1.jpg"
                  alt="作品圖片" /> -->
                <!-- 選擇的作品圖片 -->
                <!--  src的embed後面是youtub_id 要再加入"?enablejsapi=1"允許API控制影片，否則無效 -->
                <!-- 還需要加入onload -->
                <!-- https://hackmd.io/@Kyosukewu/HkkMh8Urt -->
                <iframe id="trailer" class="position-absolute w-100 h-100 top-0 start-0 rounded-3"
                  src="https://www.youtube.com/embed/pGC87JdJqho?enablejsapi=1" title="Littlefox 宣傳影片-逢魔之時"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>

              <!-- 上一頁按鈕 -->
              <button id="previousPageBtn"
                class="border border-0 bg-transparent position-absolute text-white top-50 start-0">
                <i class="fa-solid fa-chevron-left fs-1"></i>
              </button>
              <!-- 下一頁按鈕 -->
              <button id="nextPageBtn" class="border border-0 bg-transparent position-absolute text-white top-50 end-0">
                <i class="fa-solid fa-chevron-right fs-1"></i>
              </button>
            </div>

            <!-- 進度條 -->
            <div id="fill" class="position-relative mt-0 bg-primary rounded" style="width: 0%; height: 3px"></div>

            <!-- 介紹文 -->
            <div class="text-white fs-5 d-block position-relative mt-3">
              <p class="text-start">世間萬物，皆為神靈</p>
              <p class="text-start ms-5">日本神道，八百萬神</p>
              <p class="text-start">以日本八百萬神為故事原型的ＡＲＰＧ。</p>
              <p class="text-start">千萬技能，四散各地</p>
              <p class="text-start ms-5">囊括依蒨，盡收手心</p>
              <p class="text-start">探索地圖拿取秘笈，拜師學藝習得技能，</p>
              <p class="text-start">
                擊敗Boss掠取能力，蒐集所有技能成為掌握千技之人。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div class="d-block container">
    <MyInfoComponent />
    <JobsComponent />
    <ContactMeComponent />
  </div>
</template>

<script>
import ContactMeComponent from "../components/portfolio/ContactMeComponent.vue";
import JobsComponent from "../components/portfolio/JobsComponent.vue";
import MyInfoComponent from "../components/portfolio/MyInfoComponent.vue";
import GameLinkComponent from "../components/portfolio/GameLinkComponent.vue";

export default {
  components: {
    GameLinkComponent,
    MyInfoComponent,
    JobsComponent,
    ContactMeComponent,
  },
};
</script>
