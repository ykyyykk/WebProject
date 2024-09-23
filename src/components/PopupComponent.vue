<template>
  <div
    v-if="show"
    @click="this.Hide()"
    class="z-3 position-fixed w-100 vh-100 d-flex justify-content-center align-items-center"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
  >
    <!-- TODOError: 醜八怪 太醜了但功能很重要 所以放Error-->
    <div class="text-center text-white">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, required: true },
    text: { type: String, required: true },
  },
  methods: {
    Hide() {
      console.log(show);
      this.show = false;
    },
  },
};
</script>
