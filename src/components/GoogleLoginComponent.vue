<!-- https://medium.com/@lewisduda46/%E7%AD%86%E8%A8%98-%E5%9C%A8vue3%E5%B0%88%E6%A1%88%E4%B8%AD%E5%8A%A0%E5%85%A5-google%E7%99%BB%E5%85%A5-%E7%9A%84%E5%8A%9F%E8%83%BD-397403182378 -->
<template>
  <button
    @click="googleSignin"
    class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
  >
    <i class="fa-brands fa-google me-auto ms-2"></i>
    <span class="flex-grow-1 text-center">使用 Google 帳號登入</span>
  </button>
</template>

<script>
import axios from "axios";
import { googleTokenLogin } from "vue3-google-login";
import { API_BASE_URL } from "../config/api";
import { mapActions } from "vuex/dist/vuex.cjs.js";

export default {
  methods: {
    ...mapActions(["SetLogin"]),
    async googleSignin() {
      try {
        const response = await googleTokenLogin();

        const accessToken = response.access_token; // 這裡是 access_token

        if (!accessToken) {
          throw new Error("Access token is missing.");
        }

        // console.log(accessToken);

        const googlesignin = await axios.post(
          `${API_BASE_URL}/api/googlesignin`,
          {
            token: accessToken,
          }
        );

        // console.log(`loginResponse: ${JSON.stringify(loginResponse)}`);

        const email = googlesignin.data.user.email;
        const password = googlesignin.data.user.sub;

        const login = await axios.post(`${API_BASE_URL}/api/login`, {
          email: email,
          password: password,
        });

        // console.log(login);

        if (login.data.success) {
          // // JSON.stringify ObjectToJSON
          // // 因為localStorage.setItem()只能存字串 所以要先轉JSON 要用的時候在轉Object
          localStorage.setItem("user", JSON.stringify(login.data.user));
          // sessionStorage 瀏覽器關掉就沒了
          this.SetLogin({ user: login.data.user });
          alert("登入成功");
          this.$router.push({ name: "Home" });
        } else {
          alert("帳號或密碼錯誤！");
        }
      } catch (error) {
        alert(`登入失敗: ${error}`);
      }
    },
  },
};
</script>
