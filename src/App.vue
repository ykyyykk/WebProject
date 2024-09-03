<!-- script template style之間的順序 沒有固定可以隨意調動 -->
<script setup>
// import HeaderComponent from " ../components/HeaderComponent.vue";
</script>

<template>
  <!-- <HeaderComponent /> -->
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
