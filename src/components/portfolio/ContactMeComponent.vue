<template>
  <div class="d-flex justify-content-center shadow-sm mt-3 p-3 mb-5">
    <div class="col-sm-10 col-12">
      <div class="d-flex mb-3">
        <i class="fa-solid fa-phone mx-2"></i>
        <div>0950074430</div>
      </div>

      <div class="d-flex mb-3">
        <i class="fa-solid fa-envelope mx-2"></i>
        <div>louise87276@gmail.com</div>
      </div>

      <div class="d-flex mb-3">
        <CustomInputComponent v-model="name" :placeholder="'你的姓名'" />
      </div>

      <div class="d-flex mb-3">
        <CustomInputComponent v-model="email" :placeholder="'Email'" />
      </div>

      <!-- 沒辦法直接用CustomInput 沒辦法利用class修改到input 和 label -->
      <div class="d-flex mb-3">
        <div id="customTextArea">
          <textarea
            v-model="question"
            type="text"
            @input="onInput"
            @blur="onBlur"
            @keyup.enter="onEnter"
            required
            spellcheck="false"
          />
          <label>詢問內容</label>
        </div>
      </div>

      <button
        @click="SendQuestion()"
        :disabled="CantSendVerification()"
        class="d-flex justify-content-center w-100 btn btn-outline-primary"
      >
        送出 {{ GetDuration() }}
      </button>
    </div>
  </div>
</template>

<script>
import CustomInputComponent from "../../components/CustomInputComponent.vue";
import { API_BASE_URL } from "../../config/api";
import axios from "axios";

export default {
  components: { CustomInputComponent },
  data() {
    return {
      name: "",
      email: "",
      question: "",
      verified: false,
      sendDuration: 0,
      intervalID: "",
    };
  },
  methods: {
    async SendQuestion() {
      try {
        this.SetSendDuration();
        const response = await axios.post(`${API_BASE_URL}/api/sendquestion`, {
          name: this.name,
          email: this.email,
          question: this.question,
        });

        if (!response.data.success) {
          alert(`${response.data.message}`);
          return;
        }
        alert(`訊息已發送`);
      } catch (error) {
        alert(`發送訊息錯誤 ${error}`);
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
};
</script>

<style scoped>
#customTextArea {
  position: relative;
  width: 100%;
  height: 100%;
}

#customTextArea textarea {
  width: 100%;
  height: 250px;
  border-radius: 6px;
  font-size: 18px;
  padding: 10px 15px;
  border: 2px #1cd679 solid;
  background-color: white;
  /* onClick的時候不會有預設藍色的outline */
  outline: none;
  color: black;
}

#customTextArea label {
  position: absolute;
  top: 10%;
  left: 1.25%;
  transform: translateY(-50%);
  color: black;
  font-size: 19px;
  pointer-events: none;
  transition: 0.3s;
}

#customTextArea textarea:focus ~ label,
#customTextArea textarea:valid ~ label {
  top: 0px;
  font-size: 16px;
  padding: 0px 10px;
  /* 這裡要用background一樣的顏色 不能用transparent 會蓋不住border */
  background-color: white;
}
</style>
