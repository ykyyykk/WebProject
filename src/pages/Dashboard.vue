<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="產品管理" />

  <div class="p-3 w-100 h-100 mt-5">
    <a class="btn btn-outline-primary" href="product_management.html">
      產品管理
    </a>
    <button class="btn btn-outline-primary" @click="CleanExpiresVerification()">
      清理驗證碼
    </button>

    <div class="mb-5">
      <h4>訂單管理</h4>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        待出貨
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        不成立
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        退貨/退款
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        評價
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        已賣出
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        低庫存
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        未處理
      </a>
    </div>

    <div>
      <h4>用戶管理</h4>

      <button class="btn btn-outline-primary" @click="OnLogout()">登出</button>
      <a class="btn btn-outline-primary" href=""> 查看用戶 </a>
      <a class="btn btn-outline-primary" href=""> 編輯用戶 </a>
      <a class="btn btn-outline-primary" href=""> 刪除用戶 </a>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import { mapActions } from "vuex/dist/vuex.cjs.js";

export default {
  mounted() {
    //...mapState(["isManager"])順序太慢讀不到
    console.log(this.$store.state.isManager);
    if (this.$store.state.user == null) {
      this.$router.push({ name: "Home" });
    } else if (!this.$store.state.isManager) {
      this.$router.push({ name: "MemberCenter" });
    }
  },
  data() {
    return {
      amount: 0,
    };
  },
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    ...mapActions(["SetLogout"]),
    async CleanExpiresVerification() {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/deleteexpiresverification`
        );

        if (response.data.success) {
          console.log(`response.data: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.log(`error: ${error}`);
      }
    },
    OnLogout() {
      console.log("OnLogout");
      localStorage.setItem("user", null);
      this.SetLogout();
      alert("你已登出");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
