<template>
  <button
    @click="Copy()"
    class="btn text-white p-3"
    style="background-color: #02040a"
  >
    {{ content }}
    <i class="fa-solid fa-copy mx-2"></i>
  </button>
</template>

<script>
export default {
  props: {
    content: { type: String, required: true },
  },
  methods: {
    Copy() {
      navigator.clipboard.writeText(this.content);
    },
  },
};
</script>
