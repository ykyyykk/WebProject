import { createStore } from "vuex";

const pages = [
  { id: 1, src: "/banner1200_615/banner1.png" },
  { id: 2, src: "/banner1200_615/banner2.png" },
  { id: 3, src: "/banner1200_615/banner3.png" },
  { id: 4, src: "/banner1200_615/banner4.png" },
  { id: 5, src: "/banner1200_615/banner5.png" },
  { id: 6, src: "/banner1200_615/banner6.png" },
  { id: 7, src: "/banner1200_615/banner7.png" },
  { id: 8, src: "/banner1200_615/banner8.png" },
  { id: 9, src: "/banner1200_615/banner9.png" },
  { id: 10, src: "/banner1200_615/banner10.png" },
];

const events = [
  {
    href: "https://www.sinya.com.tw/events/detail/",
    src: "/events500_160/event1.png",
  },
  {
    href: "https://www.sinya.com.tw/events/detail/",
    src: "/events500_160/event2.png",
  },
];

const leftSideAd = [
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-silverstone-new/",
    src: "/leftside/silverstone-202012.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-nzxt-new/",
    src: "/leftside/nzxt-202005.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-apexgaming-new/",
    src: "/leftside/apexgaming-201903.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/welcome-to-coolpc/coolpc-ttesport-new/",
    src: "/leftside/tt-repair-1607.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-thermaltake-new/",
    src: "/leftside/tt-psu-repair-1703.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/mother-boring/coolpc-asrock-new/",
    src: "/leftside/asrock-repair-1502.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/router/coolpc-totolink-new/",
    src: "/leftside/totolink-repair-1302.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-fsp-antec-new/",
    src: "/leftside/antec-repair-1305.png",
  },
  {
    href: "https://www.coolpc.com.tw/tw/shop/man-power/coolpc-fsp-antec-new/",
    src: "/leftside/fsp-repair-1305.png",
  },
];

const rightSwiper = [
  {
    href: "https://wixtwservice.wixsite.com/sinya/microsoft?utm_term=%E5%BE%AE%E8%BB%9F+windows11+microsoft&utm_content=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95&utm_campaign=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95",
    src: "/ads300_600/ad1.png",
  },
  {
    href: "https://wixtwservice.wixsite.com/sinya/microsoft?utm_term=%E5%BE%AE%E8%BB%9F+windows11+microsoft&utm_content=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95&utm_campaign=%E5%BE%AE%E8%BB%9F%E6%B4%BB%E5%8B%95",
    src: "/ads300_600/ad2.png",
  },
];

const rightSideAd = [
  {
    href: "https://www.ctbcbank.com/content/dam/cdn/long/creditcard/new3Cplatform/index.html",
    src: "/ads133_133/ad1.png",
  },
  {
    href: "https://line.me/R/ti/p/@629gtlzk?oat_content=url&ts=07191747",
    src: "/ads133_133/ad2.png",
  },
  {
    href: "https://www.easycard.com.tw/offer?cls=1506473490,1506473503,1508721809,1508721884,&id=1718354939",
    src: "/ads133_133/ad3.png",
  },
  {
    href: "https://gnn.gamer.com.tw/detail.php?sn=265638",
    src: "/ads133_133/ad4.png",
  },
  {
    href: "https://www.facebook.com/sinyafan/posts/758541392965582",
    src: "/ads133_133/ad5.png",
  },
];

// 需要先安裝vuex
// 透過...mapActions([]) 或 ...mapMutations([]) 改變state裡面的數值
// 用哪一個取決於你是 異步 還是 同步
export default createStore({
  state: {
    items: [],
    categories: ["處理器", "主機板", "記憶體", "硬碟", "顯示卡", "鍵盤"],
    cartItems: [],
    user: null,
    isManager: false,
    searchQuery: "",
    pages,
    events,
    leftSideAd,
    rightSideAd,
    rightSwiper,
  },
  mutations: {
    // 用於直接修改state中的狀態
    // 必須為同步函數
    // 通過commit調用
    SetLoginStatus(state, user) {
      state.user = user;
      state.isManager = false;
      if (user == null) {
        return;
      }
      if (user.email === "e" && user.password === "p") {
        state.isManager = true;
      }
    },
    SetAllItems(state, items) {
      state.items = items;
    },
    SetPages(state, pages) {
      state.pages = pages;
    },
    SetSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    SetCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },
  },
  actions: {
    //不建議直接修改state的數值 違反vuex的設計原則
    //失去通過VuexDevtools追蹤狀態變化的能力
    SetLogin({ commit }, { user }) {
      commit("SetLoginStatus", user);
    },
    SetLogout({ commit }) {
      commit("SetLoginStatus", null);
    },
    SetSearchQuery({ commit }, { searchQuery }) {
      commit("SetSearchQuery", searchQuery);
    },
    SetAllItems({ commit }, { items }) {
      commit("SetAllItems", items);
    },
    SetCartItems({ commit }, { cartItems }) {
      commit("SetCartItems", cartItems);
    },
    // 失敗 嘗試讀取public/banner
    // async FetchPages({ commit }) {
    //   try {
    //     const response = await fetch("http://localhost:3000/api/images");
    //     console.log(response);
    //     const data = await response.json();
    //     commit("SetPages", data);
    //   } catch (error) {
    //     console.error("Error fetching pages:", error);
    //   }
    // },
  },
});
