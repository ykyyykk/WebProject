<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 z-3 position-absolute top-0 left-0"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    v-if="isSideBarOpen"
  >
    <div
      class="w-xs-75 w-sm-50 w-md-25 h-100 bg-white opacity-100 border border-black position-relative"
    >
      <button
        class="btn btn-outline-danger position-absolute"
        style="top: 1rem; right: 1rem"
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

<style>
@media (min-width: 576px) {
  .w-sm-50 {
    width: 50% !important;
  }
}

@media (min-width: 768px) {
  .w-md-25 {
    width: 25% !important;
  }
}

@media (min-width: 575px) {
  .w-xs-75 {
    width: 25% !important;
  }
}
</style>
