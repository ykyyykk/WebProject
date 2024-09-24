<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="註冊" />

  <div
    style="height: 500px"
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

      <button
        @click="OnSendVerificationCode()"
        class="btn btn-primary"
        :disabled="CantSendVerification"
      >
        發送驗證碼 {{ this.GetDuration }}
      </button>
    </div>

    <div
      class="input-group mb-3 d-flex justify-content-center align-items-center rounded border border-1"
    >
      <i class="fa-solid fa-lock mx-2"></i>
      <input
        :type="this.passwordVisibility ? 'text' : 'password'"
        class="form-control border border-0"
        placeholder="密碼"
        v-model="password"
        aria-label="password"
        aria-describedby="basic-addon1"
      />
      <button
        @click="this.passwordVisibility = !this.passwordVisibility"
        class="border border-0 bg-transparent"
      >
        <i class="fa-solid fa-eye-slash me-3"></i>
      </button>
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
      <button
        @click="CheckVerification()"
        class="btn btn-primary"
        :disabled="CantCheckVerification"
      >
        確認
      </button>
    </div>

    <div class="text-center mb-3">或</div>

    <GoogleRegisterComponent />
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
import GoogleRegisterComponent from "../components/GoogleRegisterComponent.vue";
import { API_BASE_URL } from "../config/api";

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
      password: "",
      verificationCode: "",
      sendDuration: 0,
      intervalID: "",
      passwordVisibility: false,
    };
  },
  computed: {
    CantCheckVerification() {
      return (
        this.name == "" ||
        this.phoneNumber == "" ||
        this.email == "" ||
        this.password == "" ||
        this.verificationCode.length < 6
      );
    },
    CantSendVerification() {
      return this.email == "" || this.sendDuration > 0;
    },
    GetDuration() {
      if (this.sendDuration <= 0) {
        return "";
      }

      const minutes = Math.floor(this.sendDuration / 60000); // 計算分鐘
      const seconds = Math.floor((this.sendDuration % 60000) / 1000); // 計算秒數

      // 確保秒數顯示兩位數，如 00:01
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${formattedSeconds}`;
    },
  },
  methods: {
    async Register() {
      try {
        await axios.post(`${API_BASE_URL}/api/register`, {
          name: this.name,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password,
        });
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
        // await 等太久 先關 等錯誤再開
        // 60000 毫秒等於 1 分鐘
        this.ClearTimer();
        this.sendDuration = 60000;
        this.intervalID = setInterval(() => {
          this.TimerCheck();
        }, 1000);

        const response = await axios.post(
          `${API_BASE_URL}/api/sendverification`,
          {
            email: this.email,
          }
        );
        if (!response.data.success) {
          this.ClearTimer();
          alert(`${response.data.message}`);
          return;
        }
        alert(`已寄送驗證信至: ${this.email}`);
      } catch (error) {
        this.ClearTimer();
        alert(`驗證信寄送失敗: ${error}`);
      }
    },
    async CheckVerification() {
      console.log(`this.verificationCode: ${this.verificationCode}`);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/checkverification`,
          {
            email: this.email,
            verificationCode: this.verificationCode,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          await this.Register();
          this.$router.push({ name: "Login" });
        }
      } catch (error) {
        alert(`驗證碼錯誤: ${error}`);
      }
    },
    TimerCheck() {
      this.sendDuration -= 1000;
      if (this.sendDuration <= 0) {
        this.ClearTimer();
      }
    },
    ClearTimer() {
      this.sendDuration = 0;
      clearInterval(this.intervalID);
    },
  },
  components: {
    HeaderComponent,
    SmallHeaderComponent,
    GoogleRegisterComponent,
  },
};
</script>
