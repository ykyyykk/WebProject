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
        <span>{{ selectCategory }}</span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="(categorya, index) in categories" :key="index">
          <a class="dropdown-item" @click="SetCategory(categorya)">
            {{ categorya }}
          </a>
        </li>
      </ul>
    </div>

    <div class="mb-3">
      <label class="form-label">價格</label>
      <input v-model="price" id="product_price" class="form-control" />
    </div>

    <div class="mb-3">
      <label class="form-label">商品數量</label>
      <input v-model="stock" id="product_price" class="form-control" />
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

    <!-- 不能把 @submit.prevent="AddNewItem()" 放這邊 會清空 而且不呼叫 -->
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
      categories: ["處理器", "主機板", "記憶體", "硬碟", "顯示卡"],
      name: "",
      detail: "",
      selectCategory: "處理器",
      price: 0,
      stock: 0,
      status: "全新",
    };
  },
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    SetCategory(category) {
      this.selectCategory = category;
    },
    SetStatus(status) {
      this.status = status;
    },
    async AddNewItem() {
      try {
        const imagePaths = {
          處理器: "img/CPU.jpg",
          主機板: "img/MB.jpg",
          記憶體: "img/RAM.jpg",
          硬碟: "img/HDD.jpg",
          顯示卡: "img/GPU.jpg",
        };

        const path = imagePaths[this.selectCategory] || "img/Ram.jpg";
        const response = await axios.post(
          "http://localhost:3000/api/addnewitem",
          {
            name: this.name,
            detail: this.detail,
            category: this.selectCategory,
            price: this.price,
            stock: this.stock,
            status: this.status,
            imageUrl: path,
          }
        );
        alert("新增物品成功");
      } catch (error) {
        alert("新增物品失敗", error);
      }
    },
  },
};
</script>
