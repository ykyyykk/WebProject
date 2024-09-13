<!-- https://medium.com/@lewisduda46/%E7%AD%86%E8%A8%98-%E5%9C%A8vue3%E5%B0%88%E6%A1%88%E4%B8%AD%E5%8A%A0%E5%85%A5-google%E7%99%BB%E5%85%A5-%E7%9A%84%E5%8A%9F%E8%83%BD-397403182378 -->
<template>
  <button
    @click="googleRegister"
    class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
  >
    <i class="fa-brands fa-google me-auto ms-2"></i>
    <span class="flex-grow-1 text-center">使用 Google 帳號註冊</span>
  </button>
</template>

<script>
import axios from "axios";
import { googleTokenLogin } from "vue3-google-login";

export default {
  methods: {
    async googleRegister() {
      try {
        const response = await googleTokenLogin();

        // Post the token to your server
        const loginResponse = await axios.post(
          "http://localhost:3000/api/googlesignin",
          {
            token: response.access_token,
          }
        );

        const name = loginResponse.data.user.name;
        // const phoneNumber = loginResponse.data.user.phoneNumbers?.[0]?.value;
        const phoneNumber =
          loginResponse.data.user.phoneNumbers == undefined
            ? ""
            : loginResponse.data.user.phoneNumbers[0].value;
        const email = loginResponse.data.user.email;
        const password = loginResponse.data.user.sub;

        // Register user
        await axios.post("http://localhost:3000/api/register", {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        });

        alert("註冊成功");
      } catch (error) {
        alert(`註冊失敗: ${error}`);
      }
    },
  },
};
</script>
