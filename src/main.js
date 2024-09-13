import { createApp } from "vue";
import App from "./App.vue";
//不需要在後面加上index.js 讀取router資料夾後自動讀取底下index.js
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "animejs/lib/anime.es.js";
import store from "./store";
import axios from "axios";
// 需要更多複雜功能 例如 Google Drive、Google Calendar 需要改安裝 vue3-google-oauth2;
import vue3GoogleLogin from "vue3-google-login";

const GoogleLoginOptions = {
  clientId:
    "80477468988-2fldqciks5d038o7i2qrbvssoa7entnt.apps.googleusercontent.com",
  //取得個人資料 email 電話沒辦法拿到 除非使用者主動自己設定
  //google頭像>管理你的google帳戶>個人資訊>前往關於我的頁面>新增聯絡資訊>新增電話號碼
  scope:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
};
// 全域路由守衛
router.beforeEach(async (to, from, next) => {
  try {
    let userID = 0;
    if (
      localStorage.getItem("userID") != null &&
      localStorage.getItem("userID") != 0
    ) {
      userID = localStorage.getItem("userID");
      store.dispatch("SetLogin", { userID: userID });
      console.log(`userID: ${userID}`);
    }
    const allItemsResponse = await axios.get(
      "http://localhost:3000/api/getallitem"
    );
    // 在.vue以外的地方只能使用store.dispatch
    // 他的功能等同於...mapActions 但 ...mapActions只能在.vue以內使用
    store.dispatch("SetAllItems", { items: allItemsResponse.data.items });

    const cartItemsResponse = await axios.get(
      "http://localhost:3000/api/getcartitems",
      {
        params: {
          userID: userID,
        },
      }
    );
    if (cartItemsResponse.data.success) {
      store.dispatch("SetCartItems", {
        cartItems: cartItemsResponse.data.items,
      });
    }
    next();
  } catch (error) {
    alert("取得所有物品失敗", error);
    next(false); // 阻止導航
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vue3GoogleLogin, GoogleLoginOptions);
app.mount("#app");
