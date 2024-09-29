<template>
  <div
    v-if="isVisible"
    @click="Hide()"
    class="z-3 position-fixed w-100 vh-100 d-flex justify-content-center align-items-center border border-black"
    :style="{ backgroundColor: 'rgba(13, 17, 22,0.8)' }"
  >
    <div id="popup_rainbow">
      <div id="popup_rainbowblur"></div>
      <div id="popup_background">
        <div class="text-center text-white">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../utils/eventBus.js";

export default {
  data() {
    return {
      isVisible: false,
      text: "",
    };
  },
  mounted() {
    // 不需要() 會Error
    EventBus.on("showPopup", this.Show);
    EventBus.on("hidePopup", this.Hide);
  },
  beforeDestroy() {
    EventBus.off("showPopup", this.Show);
    EventBus.off("hidePopup", this.Hide);
  },
  methods: {
    Show(text) {
      this.isVisible = true;
      this.text = text;
    },
    Hide() {
      this.isVisible = false;
      this.text = "";
    },
  },
};
</script>

<style>
/* https://www.youtube.com/watch?v=ezP4kbOvs_E */

#popup_background {
  position: relative;
  padding: 2em;
  background: #0d1116;
  border-radius: 10px;
}

/* 自定義變數 */
@property --angle {
  /* 設定只能是數字 單位是deg */
  syntax: "<angle>";
  /* 初始值 */
  initial-value: 0deg;
  /* 一個預設值 給自定義變數 */
  inherits: false;
}

#popup_rainbow {
  background-image: conic-gradient(from var(--angle), red, yellow, blue, red);
  animation: 3s spin linear infinite;
  translate: -50% -50%;
  z-index: -1;
  padding: 2px 2px;
  border-radius: 10px;
}

/* 動畫參數 在div 裡面的animation用到 */
@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}
</style>
