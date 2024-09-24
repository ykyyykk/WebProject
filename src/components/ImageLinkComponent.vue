<template>
  <a :href="obj.href">
    <img :src="obj.src" />
  </a>
</template>

<script>
export default {
  props: {
    obj: { type: Object, required: true },
  },
};
</script>
