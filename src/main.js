import { createApp } from "vue";
import App from "./App.vue";
//不需要在後面加上index.js 讀取router資料夾後自動讀取底下index.js
import router from "./router";

createApp(App).use(router).mount("#app");
