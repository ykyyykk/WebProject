<!-- script template style之間的順序 沒有固定可以隨意調動 -->
<template>
  <HeaderComponent />
  <!-- 不要嘗試在這邊 :items="items" 改用vuex的getter 或 computed 來抓items -->
  <router-view />
  <FooterComponent />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
};
</script>
