<!-- https://medium.com/@lewisduda46/%E7%AD%86%E8%A8%98-%E5%9C%A8vue3%E5%B0%88%E6%A1%88%E4%B8%AD%E5%8A%A0%E5%85%A5-google%E7%99%BB%E5%85%A5-%E7%9A%84%E5%8A%9F%E8%83%BD-397403182378 -->
<template>
  <!-- <button @click="googleSignin">GoogleLoginComponent2</button> -->

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

export default {
  methods: {
    googleSignin() {
      googleTokenLogin().then((response) => {
        // 授權範圍
        // console.log("Granted scopes:", response.scope);
        axios
          .post("http://localhost:3000/api/googlesignin", {
            token: response.access_token,
          })
          .then((response) => {
            console.log(`response: ${JSON.stringify(response)}`);
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      });
    },
  },
};
</script>
