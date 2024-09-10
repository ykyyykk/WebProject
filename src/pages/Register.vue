<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="註冊" />

  <div
    class="d-flex flex-column justify-content-center align-items-center p-0 container overflow-x-hidden"
  >
    <div
      class="d-block justify-content-center align-items-center mt-5 p-2 w-100"
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

        <!-- TODOWarning: 設定1分鐘後才能再取驗證碼 -->
        <button
          @click="OnSendVerificationCode()"
          class="btn btn-primary"
          :disabled="CanSendVerification"
        >
          發送驗證碼
        </button>
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

      <div
        class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
      >
        <input
          type="text"
          class="form-control"
          placeholder="驗證碼"
          v-model="verificationCode"
          aria-label="verification code"
        />
        <!-- TODOWarning: 當驗證碼.length == 6 && 驗證碼 != last驗證碼 checking == false -->
        <button
          @click="CheckVerification()"
          class="btn btn-primary"
          :disabled="CanCheckVerification"
        >
          確認
        </button>
      </div>

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
    </div>
  </div>

  <div class="mb-0 mt-auto">
    <p class="text-center">註冊即表示您已閱讀並同意蝦皮購物</p>
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
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
      password: "",
      verificationCode: "",
      codeSent: false,
      verified: false,
      checking: false,
    };
  },
  computed: {
    CanCheckVerification() {
      return (
        this.name == "" ||
        this.phoneNumber == "" ||
        this.email == "" ||
        this.password == "" ||
        this.verificationCode.length < 6
      );
    },
    CanSendVerification() {
      return this.email == "";
    },
  },
  methods: {
    async Register() {
      try {
        //TODOWarning: 做一個檢查
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            name: this.name,
            phoneNumber: this.phoneNumber,
            email: this.email,
            password: this.password,
          }
        );
        alert("註冊成功");
      } catch (error) {
        alert("註冊失敗", error);
      }
    },
    async OnSendVerificationCode() {
      if (this.email == "") {
        alert("請先輸入email");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sendverification",
          {
            email: this.email,
          }
        );
        this.codeSent = true;
        alert(`已寄送驗證信至: ${this.email}`);
      } catch (error) {
        alert(`驗證信寄送失敗: ${error}`);
      }
    },
    async CheckVerification() {
      this.checking = true;
      console.log(`this.verificationCode: ${this.verificationCode}`);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/checkverification",
          {
            email: this.email,
            verificationCode: this.verificationCode,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          await this.Register();
          this.router.push({ name: "Login" });
        }
      } catch (error) {
        alert(`驗證碼錯誤: ${error}`);
      }
    },
  },
  components: { HeaderComponent, SmallHeaderComponent },
};
</script>
