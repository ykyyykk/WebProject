import { createStore } from "vuex";

// Define the image paths
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
  { id: 1, src: "/events500_160/event1.png" },
  { id: 2, src: "/events500_160/event2.png" },
  { id: 3, src: "/events500_160/event3.png" },
];

// 需要先安裝vuex
// 這邊再把items變全域
// 透過...mapActions([]) 或 ...mapMutations([]) 改變state裡面的數值
// 用哪一個取決於你是 異步 還是 同步
export default createStore({
  state: {
    items: [],
    cartItems: [],
    // 直接存User失敗 要不斷轉JSON 轉Object 因為localStorage.setItem()只能存字串
    user: null,
    searchQuery: "",
    pages,
    events,
  },
  mutations: {
    // 用於直接修改state中的狀態
    // 必須為同步函數
    // 通過commit調用
    SetLoginStatus(state, user) {
      state.user = user;
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
  getters: {
    smallThenXXL: (state) => window.innerWidth < 1399,
    smallThenXL: (state) => window.innerWidth < 1199,
    smallThenLG: (state) => window.innerWidth < 991,
    smallThenMD: (state) => window.innerWidth < 767,
    smallThenSM: (state) => window.innerWidth < 575,
  },
});
