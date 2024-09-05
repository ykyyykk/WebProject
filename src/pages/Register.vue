<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="註冊" />

  <div
    class="d-flex flex-column justify-content-center align-items-center m-0 p-0 container overflow-x-hidden"
  >
    <div
      class="d-block justify-content-center align-items-center mt-5 p-2 w-100"
    >
      <div
        class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
      >
        <i class="fa-solid fa-user ms-2 me-2"></i>
        <input
          type="text"
          class="form-control border border-0"
          placeholder="姓名"
          v-model="name"
          aria-label="username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div
        class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
      >
        <i class="fa-solid fa-phone ms-2 me-2"></i>
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
        <i class="fa-solid fa-envelope ms-2 me-2"></i>
        <input
          type="text"
          class="form-control border border-0"
          placeholder="Email"
          v-model="email"
          aria-label="email"
          aria-describedby="basic-addon1"
        />
      </div>

      <button @click="Register" class="btn btn-primary w-100 mb-3">
        下一步
      </button>
      <div class="text-center mb-3">或</div>

      <button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-google me-auto ms-2"></i>
        <span class="flex-grow-1 text-center">使用 Google 帳號註冊</span>
      </button>

      <button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-facebook me-auto ms-2"></i>
        <span class="flex-grow-1 text-center"
          >使用 Facebook 帳號註冊</span
        ></button
      ><button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-line me-auto ms-2"></i>
        <span class="flex-grow-1 text-center">使用 LINE 帳號註冊</span>
      </button>

      <!-- TODOError: 帳號註冊按鈕沒有完全置中 -->
    </div>
  </div>

  <div class="mb-0 mt-auto">
    <p class="text-center">
      點擊「下一步」或繼續註冊，即表示您已閱讀並同意蝦皮購物
    </p>
    <p class="text-center">的服務條款與隱私權政策</p>
    <p class="text-center">
      已經有蝦皮帳號了嗎？<router-link
        :to="{ name: 'Login' }"
        class="text-decoration-none"
        >登入</router-link
      >
    </p>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  // 不加這一行 input輸入時會有Warning
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
    };
  },
  methods: {
    async Register() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
          }
        );
        alert("註冊成功");
      } catch (error) {
        alert("註冊失敗", error);
      }
    },
  },
  components: { HeaderComponent, SmallHeaderComponent },
};
</script>
