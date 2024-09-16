<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="會員中心" />

  <div
    class="d-block justify-content-center align-items-center mt-5 p-3 w-100 overflow-x-hidden container"
  >
    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-user mx-2"></i>
      <input
        type="text"
        class="form-control border border-0"
        placeholder="姓名"
        v-model="name"
        aria-label="name"
        aria-describedby="basic-addon1"
      />
    </div>

    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-phone mx-2"></i>
      <input
        type="text"
        class="form-control border border-0"
        placeholder="電話"
        v-model="phoneNumber"
        aria-label="phonenumber"
        aria-describedby="basic-addon1"
      />
    </div>

    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-envelope mx-2"></i>
      <input
        type="text"
        class="form-control border border-0"
        placeholder="Email"
        v-model="email"
        aria-label="email"
        aria-describedby="basic-addon1"
      />
    </div>

    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-lock mx-2"></i>
      <input
        type="text"
        class="form-control border border-0"
        placeholder="密碼"
        v-model="password"
        aria-label="password"
        aria-describedby="basic-addon1"
      />
    </div>

    <button class="btn btn-outline-primary" @click="OnLogout()">登出</button>
    <button class="btn btn-outline-primary" @click="SaveUserInfo()">
      儲存
    </button>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import { mapActions } from "vuex/dist/vuex.cjs.js";
import { API_BASE_URL } from "../config/api";
//在 OptionsAPI 中 通常不使用 useStore useRouter 這些是 CompositionAPI 的一部分

export default {
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
  },
  created() {
    // 在組件創建時檢查用戶狀態
    if (this.$store.state.user == null) {
      this.$router.push({ name: "Login" });
      return;
    }

    // 從 store 中獲取數據
    this.name = this.$store.state.user.name;
    this.phoneNumber = this.$store.state.user.phoneNumber;
    this.email = this.$store.state.user.email;
    this.password = this.$store.state.user.password;
  },
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    ...mapActions(["SetLogout"]),
    SaveUserInfo() {
      console.log(`data.name: ${this.name}`);
      console.log("SaveUserInfo");
    },
    OnLogout() {
      localStorage.setItem("user", null);
      this.SetLogout();
      alert("你已登出");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
