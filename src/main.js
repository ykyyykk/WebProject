import { createApp } from "vue";
import App from "./App.vue";
//不需要在後面加上index.js 讀取router資料夾後自動讀取底下index.js
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import store from "./store";
import axios from "axios";

// 全域路由守衛
router.beforeEach(async (to, from, next) => {
  try {
    if (
      localStorage.getItem("userID") != null &&
      localStorage.getItem("userID") != 0
    ) {
      const userID = localStorage.getItem("userID");
      store.dispatch("SetLogin", { userID: userID });
      console.log(`userID: ${userID}`);
    }
    const response = await axios.get("http://localhost:3000/api/getallitem");
    // 在.vue以外的地方只能使用store.dispatch
    // 他的功能等同於...mapActions 但 ...mapActions只能在.vue以內使用
    store.dispatch("SetAllItems", { items: response.data.items });
    // console.log(`取得所有物品成功: ${response.data.items}`);

    //嘗試動態讀取banner 失敗
    // store.dispatch("FetchPages");
    next();
  } catch (error) {
    alert("取得所有物品失敗", error);
    next(false); // 阻止導航
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
