import { createStore } from "vuex";

// 需要先安裝vuex
// 這邊再把items變全域
// 透過...mapActions([]) 或 ...mapMutations([]) 改變state裡面的數值
// 用哪一個取決於你是 異步 還是 同步
export default createStore({
  state: {
    items: [],
    isLogin: false,
    userID: 0,
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
    SetItems(state, items) {
      state.items = items;
    },
    AddItem(state, newItem) {
      // 新增物品第四步
      state.items.push(newItem);
    },
  },
  actions: {
    //不建議直接修改state的數值 違反vuex的設計原則
    //失去通過VuexDevtools追蹤狀態變化的能力
    SetLogin({ commit }, { userID }) {
      commit("SetLoginStatus", true);
      commit("SetUserID", userID);
      localStorage.setItem("userID", userID);
    },
    SetLogout({ commit }) {
      commit("SetLoginStatus", false);
      commit("SetUserID", 0);
    },
    SetAllItems({ commit }, { items }) {
      commit("SetItems", items);
    },
  },
  getters: {
    getItems: (state) => state.items,
    isLogin: (state) => state.isLogin,
    getUserID: (state) => state.userID,
  },
});
