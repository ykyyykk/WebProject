<template>
  <button @click="googleSignin">aaa</button>
</template>

<script>
import axios from "axios";
import { googleTokenLogin } from "vue3-google-login";

export default {
  setup() {
    function googleSignin() {
      googleTokenLogin().then((response) => {
        axios
          .post("google-signin", { token: response.access_token })
          .then((response) => {
            console.log(`response: ${response}`);
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      });
    }

    // 返回 googleSignin 供模板使用
    return {
      googleSignin,
    };
  },
};
</script>
