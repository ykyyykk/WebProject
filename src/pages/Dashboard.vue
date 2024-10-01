<template>
  <SmallHeaderComponent pageTitle="產品管理" />

  <div class="d-flex">
    <DashboardSideBarComponent />
    <router-view />
  </div>
</template>

<script>
// TODOError:暫時註解掉 不知道為什麼 如果不註解掉 AddItem.vue 的dropdown會壞掉
import DashboardSideBarComponent from "../components/DashboardSideBarComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  mounted() {
    //...mapState(["isManager"])順序太慢讀不到
    console.log(`isManager: ${this.$store.state.isManager}`);
    if (this.$store.state.user == null) {
      this.$router.push({ name: "Home" });
    } else if (!this.$store.state.isManager) {
      this.$router.push({ name: "MemberCenter" });
    }
  },
  components: {
    SmallHeaderComponent,
    DashboardSideBarComponent,
  },
};
</script>
