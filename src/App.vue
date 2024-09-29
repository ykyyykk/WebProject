<!-- script template style之間的順序 沒有固定可以隨意調動 -->
<template>
  <!-- 不要嘗試在這邊 :items="items" 改用vuex的getter 或 computed 來抓items -->
  <router-view />
  <FooterComponent />
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: { FooterComponent },
};
</script>
