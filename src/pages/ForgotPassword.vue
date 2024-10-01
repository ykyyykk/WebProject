<template>
  <SmallHeaderComponentVue pageTitle="忘記密碼" />

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
        type="text"
        v-model="verificationCode"
        class="form-control border border-0"
        placeholder="驗證碼"
        aria-describedby="basic-addon1"
      />
      <i class="fa-solid fa-eye-slash me-3"></i>
    </div>

    <button
      @click="SendForgotPasswordCode()"
      :disabled="CantSendVerification"
      class="btn btn-primary w-100 mb-3"
    >
      發送驗證碼 {{ this.GetDuration }}
    </button>

    <button
      @click="CheckVerification()"
      :disabled="this.verificationCode.length < 6"
      class="btn btn-primary w-100 mb-3"
    >
      驗證
    </button>
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
import SmallHeaderComponentVue from "../components/SmallHeaderComponent.vue";
import { API_BASE_URL } from "../config/api";
import axios from "axios";

export default {
  components: { SmallHeaderComponentVue },
  data() {
    return {
      email: "",
      verificationCode: "",
      verified: false,
      sendDuration: 0,
      intervalID: "",
    };
  },
  computed: {
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
    async SendForgotPasswordCode() {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/sendforgotpasswordcode`,
          {
            email: this.email,
          }
        );

        if (!response.data.success) {
          alert(`${response.data.message}`);
          return;
        }
        alert(`驗證碼已發送`);
        this.SetSendDuration();
      } catch (error) {
        alert(`發送驗證碼錯誤 ${error}`);
      }
    },
    async CheckVerification() {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/checkverification`,
          {
            email: this.email,
            verificationCode: this.verificationCode,
          }
        );
        if (!response.data.success) {
          alert(`${response.data.message}`);
          return;
        }
        alert(`驗證碼正確 密碼為: ${response.data.row.password}`);
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
    SetSendDuration() {
      // 60000 毫秒等於 1 分鐘
      this.ClearTimer();
      this.sendDuration = 10000;
      this.intervalID = setInterval(() => {
        this.TimerCheck();
      }, 1000);
    },
  },
};
</script>
