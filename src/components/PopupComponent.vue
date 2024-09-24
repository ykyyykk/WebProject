<template>
  <div
    v-if="isVisible"
    @click="Hide()"
    class="z-3 position-fixed w-100 vh-100 d-flex justify-content-center align-items-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
  >
    <!-- TODOAdd: 醜八怪 太醜了但功能很重要 所以放Error-->
    <div class="text-center text-white">{{ text }}</div>
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
