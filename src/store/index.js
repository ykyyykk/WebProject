import { createStore } from "vuex";

// 需要先安裝vuex
// 這邊再把items變全域
export default createStore({
  state: {
    items: [
      {
        title: "商品名稱0",
        id: 0,
        detail: "詳細資訊0",
        price: "10",
        stock: "15",
      },
      {
        title: "商品名稱1",
        id: 1,
        detail: "詳細資訊1",
        price: "20",
        stock: "25",
      },
      {
        title: "商品名稱2",
        id: 2,
        detail: "詳細資訊2",
        price: "30",
        stock: "35",
      },
      {
        title: "商品名稱3",
        id: 3,
        detail: "詳細資訊3",
        price: "40",
        stock: "45",
      },
    ],
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
    AddNewItem({ commit }) {
      const newItem = {
        id: Date.now(),
        title: "新商品",
        detail: "新商品詳情",
        price: 50,
        stock: 55,
      };
      commit("AddItem", newItem);
    },
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
