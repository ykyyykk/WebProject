<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 z-3 position-absolute top-0 left-0"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    v-if="isOpen"
  >
    <div class="w-75 h-100 bg-white opacity-100 border border-black">
      <button
        class="border border-0 position-absolute"
        style="top: 1rem; right: 10rem"
        @click="Close()"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOpen(newVal) {
      // 當 isOpen 為 true 時禁用捲軸，為 false 時恢復
      document.body.style.overflow = newVal ? "hidden" : "auto";
    },
  },
  methods: {
    Close() {
      console.log("Close");
      // 沒辦法透過this.isOpen = false 關閉
      this.$emit("update:isOpen", false);
    },
  },
};
</script>
