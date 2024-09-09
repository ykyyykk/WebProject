<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 z-3 position-absolute top-0 left-0"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    v-if="isSideBarOpen"
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
    isSideBarOpen: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isSideBarOpen(newValue) {
      if (newValue) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
  methods: {
    Close() {
      // 沒辦法透過this.isOpen = false 關閉
      // 告訴父物件isSideBarOpen = false
      this.$emit("update:isSideBarOpen", false);
    },
  },
};
</script>
