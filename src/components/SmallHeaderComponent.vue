<template>
  <div
    class="w-100 d-flex justify-content-start align-items-center shadow-sm px-2 pb-2"
  >
    <button @click="Back()" class="bg-transparent border border-0">
      <i class="fa-solid fa-arrow-left"></i> {{ pageTitle }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: "返回",
    },
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>
