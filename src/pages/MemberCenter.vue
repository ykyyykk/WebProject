<template>
  <SmallHeaderComponent pageTitle="會員中心" />

  <div
    style="height: 600px"
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

    <div class="d-flex justify-content-evenly">
      <button class="btn btn-outline-danger w-25" @click="OnLogout()">
        登出
      </button>
      <button class="btn btn-outline-primary w-25" @click="SaveUserInfo()">
        儲存
      </button>
    </div>
  </div>
</template>

<script>
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import { mapActions } from "vuex/dist/vuex.cjs.js";
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
  components: { SmallHeaderComponent },
  methods: {
    ...mapActions(["SetLogout"]),
    SaveUserInfo() {
      console.log(`data.name: ${this.name}`);
      console.log("SaveUserInfo");
    },
    OnLogout() {
      localStorage.setItem("user", null);
      this.SetLogout();
      this.$router.push({ name: "Home" });
      alert("你已登出");
    },
  },
};
</script>
