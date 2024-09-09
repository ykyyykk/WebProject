<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 position-absolute left-0 bg-white p-3 z-3"
    style="top: 4rem"
    v-if="isOpen"
  >
    <input type="text" class="form-control" placeholder="查詢" />
    <h1>搜尋</h1>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
};
</script>
