<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="登入" />

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
          placeholder="電話號碼/Email/使用者帳號"
          aria-label="PhoneNumber/email/account"
          aria-describedby="basic-addon1"
        />
      </div>

      <div
        class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
      >
        <i class="fa-solid fa-lock ms-2 me-2"></i>
        <input
          type="text"
          class="form-control border border-0"
          placeholder="密碼"
          aria-label="password"
          aria-describedby="basic-addon1"
        />
        <i class="fa-solid fa-eye-slash me-3"></i>
        <router-link
          :to="{ name: 'ForgotPassword' }"
          class="me-2 text-decoration-none"
          href="forgot_password.html"
          >忘記密碼</router-link
        >
      </div>

      <button class="btn btn-primary w-100 mb-3">下一步</button>

      <div class="d-flex justify-content-end">
        <a class="text-decoration-none" href="#">使用SMS簡訊登入</a>
      </div>

      <div class="text-center mb-3">或</div>

      <button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-google me-auto ms-2"></i>
        <span class="flex-grow-1 text-center">使用 Google 帳號登入</span>
      </button>

      <button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-facebook me-auto ms-2"></i>
        <span class="flex-grow-1 text-center"
          >使用 Facebook 帳號登入</span
        ></button
      ><button
        class="btn btn-outline-dark w-100 mb-3 d-flex justify-content-center align-items-center"
      >
        <i class="fa-brands fa-line me-auto ms-2"></i>
        <span class="flex-grow-1 text-center">使用 LINE 帳號登入</span>
      </button>
      <!-- TODOError: google帳號登入按鈕沒有完全置中 -->
    </div>
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
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>
