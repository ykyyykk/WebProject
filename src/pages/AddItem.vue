<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="新增商品" />

  <form @submit.prevent="AddNewItem()" class="p-3 w-100 h-100 mt-5">
    <div class="mb-3">
      <label class="form-label">商品圖片</label>
      <input class="form-control" type="file" id="product_image" />
    </div>

    <div class="mb-3">
      <label class="form-label">商品名稱</label>
      <input
        class="form-control"
        v-model="name"
        aria-describedby="product_name"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">商品描述</label>
      <input v-model="detail" class="form-control" />
    </div>

    <div class="dropdown mb-3">
      <span>商品分類: </span>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>{{ category }}</span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" @click="SetCategory('分類0')">分類0</a>
        </li>
        <li>
          <a class="dropdown-item" @click="SetCategory('分類1')">分類1</a>
        </li>
        <li>
          <a class="dropdown-item" @click="SetCategory('分類2')">分類2</a>
        </li>
      </ul>
    </div>

    <div class="mb-3">
      <label class="form-label">價格</label>
      <input id="product_price" class="form-control" />
    </div>

    <div class="mb-3">
      <label class="form-label">商品數量</label>
      <input id="product_price" class="form-control" />
    </div>

    <div class="dropdown mb-3">
      <span>商品狀態: </span>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>{{ status }}</span>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="SetStatus('全新')">全新</a></li>
        <li><a class="dropdown-item" @click="SetStatus('二手')">二手</a></li>
      </ul>
    </div>

    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->

    <!-- 還沒測試過 新增物品第一步-->
    <button class="btn btn-primary">新增物品</button>
  </form>
</template>

<script>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  data() {
    return {
      name: "",
      detail: "",
      category: "分類0",
      price: 0,
      stock: 0,
      status: "全新",
    };
  },
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    SetCategory(category) {
      this.category = category;
    },
    SetStatus(status) {
      this.status = status;
    },
    async AddNewItem() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/addnewitem",
          {
            name: this.name,
            detail: this.detail,
            category: this.category,
            price: this.price,
            stock: this.stock,
            status: this.status,
          }
        );
        alert("新增物品成功");
      } catch (error) {
        alert("新增物品失敗", error);
      }
    },
    // 以下是已經沒用的 新增物品到store/index.js
    // // 新增物品第二步
    // AddNewItem() {
    //   console.log("AddNewItem");
    //   const newItem = {
    //     id: this.$store.state.items.length,
    //     title: "新商品",
    //     detail: "新商品詳情",
    //     price: "50",
    //     stock: "55",
    //   };
    //   // 新增物品第三步 跑到store
    //   this.$store.commit("AddItem", newItem);
    // },
    // 這邊對應到 store.actions.AddNewItem 固定新增同樣的內容
    // AddNewItem2() {
    //   this.$store.dispatch("AddNewItem");
    // },
  },
};
</script>
