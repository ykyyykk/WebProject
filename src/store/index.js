import { createStore } from "vuex";

// 需要先安裝vuex
// 這邊再把items變全域
export default createStore({
  state: {
    items: [],
  },
  mutations: {
    // 需要修改 items 在這邊加mutation
    // 用於直接修改store中的狀態
    // 必須為同步函數
    // 通過commit調用
    AddItem(state, newItem) {
      // 新增物品第四步
      state.items.push(newItem);
    },
  },
  actions: {
    // AddNewItem({ commit }) {
    //   const newItem = {
    //     id: Date.now(),
    //     title: "新商品",
    //     detail: "新商品詳情",
    //     price: 50,
    //     stock: 55,
    //   };
    //   commit("AddItem", newItem);
    // },
  },
  getters: {
    getItems: (state) => state.items,
  },
  methods: {
    // 可以是同步或異步函數
    AddNewItem() {
      this.$store.commit("AddItem", {
        title: "新商品",
        id: 4,
        detail: "新詳細資訊",
        price: "50",
        stock: "55",
      });
    },
  },
});
