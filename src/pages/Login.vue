<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="登入" />

  <div
    style="height: 500px"
    class="d-block justify-content-center align-items-center mt-5 p-3 w-100 overflow-x-hidden container"
  >
    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-envelope mx-2"></i>
      <input
        type="text"
        class="form-control border border-0"
        placeholder="Email"
        v-model="email"
        aria-label="Email"
        aria-describedby="basic-addon1"
      />
    </div>

    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-lock mx-2"></i>
      <input
        :type="this.passwordVisibility ? 'text' : 'password'"
        v-model="password"
        class="form-control border border-0"
        placeholder="密碼"
        aria-label="password"
        aria-describedby="basic-addon1"
      />
      <button
        @click="this.passwordVisibility = !this.passwordVisibility"
        class="border border-0 bg-transparent"
      >
        <i class="fa-solid fa-eye-slash me-3"></i>
      </button>

      <router-link
        :to="{ name: 'ForgotPassword' }"
        class="me-2 text-decoration-none"
        href="forgot_password.html"
        >忘記密碼</router-link
      >
    </div>

    <button @click="Login()" class="btn btn-primary w-100 mb-3">登入</button>

    <GoogleLoginComponent />
  </div>
  <div class="mb-0 mt-auto">
    <p class="text-center">登入後，表示你同意蝦皮的服務條款以及隱私權政策</p>
    <p class="text-center">
      還沒有蝦皮帳號嗎？
      <router-link :to="{ name: 'Register' }" class="text-decoration-none">
        註冊
      </router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import { mapActions } from "vuex/dist/vuex.cjs.js";
import GoogleLoginComponent from "../components/GoogleLoginComponent.vue";
import { API_BASE_URL } from "../config/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordVisibility: false,
    };
  },
  components: {
    HeaderComponent,
    SmallHeaderComponent,
    GoogleLoginComponent,
  },
  methods: {
    ...mapActions(["SetLogin"]),
    async Login() {
      try {
        // 與get不同 post不需將資料顯示在url上 隱私較好 但速度比get稍慢 適用於提交數據
        const response = await axios.post(`${API_BASE_URL}/api/login`, {
          email: this.email,
          password: this.password,
        });

        console.log(response.data);
        if (response.data.success) {
          // console.log(`response.data: ${JSON.stringify(response.data.user)}`);
          // console.log(`id: ${response.data.user.id}`);
          // // JSON.stringify ObjectToJSON
          // // 因為localStorage.setItem()只能存字串 所以要先轉JSON 要用的時候在轉Object
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // sessionStorage 瀏覽器關掉就沒了
          this.SetLogin({ user: response.data.user });
          alert("登入成功");
          this.$router.push({ name: "Home" });
        } else {
          alert("帳號或密碼錯誤！");
        }
      } catch (error) {
        alert(`帳號或密碼錯誤！ ${error}`);
      }
    },
  },
};
</script>
