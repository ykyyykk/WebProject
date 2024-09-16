<template>
  <button
    @click="ScrollToTop()"
    class="btn btn-primary position-fixed"
    style="bottom: 70px; right: 20px"
  >
    <i class="fa-solid fa-arrow-up"></i>
  </button>
  <button
    @click="ScrollToBottom()"
    class="btn btn-primary position-fixed"
    style="bottom: 20px; right: 20px"
  >
    <i class="fa-solid fa-arrow-down"></i>
  </button>
</template>

<script>
export default {
  methods: {
    ScrollToTop() {
      // behavior 是平滑捲動
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    ScrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
  },
};
</script>
