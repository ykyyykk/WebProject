import { createStore } from "vuex";

// Define the image paths
const pages = [
  { id: 1, src: "/banner/banner1.jpg" },
  { id: 2, src: "/banner/banner2.jpg" },
  { id: 3, src: "/banner/banner3.jpg" },
  { id: 4, src: "/banner/banner4.jpg" },
  // Add more images as needed
];

// 需要先安裝vuex
// 這邊再把items變全域
// 透過...mapActions([]) 或 ...mapMutations([]) 改變state裡面的數值
// 用哪一個取決於你是 異步 還是 同步
export default createStore({
  state: {
    items: [],
    cartItems: [],
    isLogin: false,
    userID: 0,
    // 直接存User失敗 要不斷轉JSON 轉Object 因為localStorage.setItem()只能存字串
    // user: {
    //   isLogin: false,
    //   id: 0,
    //   name: "",
    //   phoneNumber: "",
    //   email: "",
    //   password: "",
    // },
    searchQuery: "",
    pages,
  },
  mutations: {
    // 用於直接修改state中的狀態
    // 必須為同步函數
    // 通過commit調用
    SetLoginStatus(state, status) {
      state.isLogin = status;
    },
    SetUserID(state, id) {
      state.userID = id;
    },
    // SetLoginStatus(state, user) {
    //   state.user = user;
    //   // console.log(user);
    //   localStorage.setItem("user", user);
    // },
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
    SetLogin({ commit }, { userID }) {
      commit("SetLoginStatus", true);
      commit("SetUserID", userID);
      // commit("SetLoginStatus", user);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("userID", userID);
    },
    SetLogout({ commit }) {
      console.log("SetLogout");
      commit("SetLoginStatus", false);
      commit("SetUserID", 0);
      // commit("SetLoginStatus", {
      //   isLogin: false,
      //   id: 0,
      //   name: "",
      //   phoneNumber: "",
      //   email: "",
      //   password: "",
      // });
      localStorage.setItem("isLogin", false);
      localStorage.setItem("userID", 0);
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
    getItems: (state) => state.items,
    getCartItems: (state) => state.cartItems,
    isLogin: (state) => state.isLogin,
    getUserID: (state) => state.userID,
    getPages: (state) => state.pages,
    getSearchQuery: (state) => state.searchQuery,
    // getUser: (state) => state.user,
    // isLogin: (state) => state.user.isLogin,
    // getUserID: (state) => state.user.userID,
  },
});
