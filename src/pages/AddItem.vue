<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="新增商品" />

  <form class="p-3 w-100 h-100 mt-5">
    <div class="mb-3">
      <label class="form-label">商品圖片</label>
      <input class="form-control" type="file" id="product_image" />
    </div>

    <div class="mb-3">
      <label class="form-label">商品名稱</label>
      <input
        class="form-control"
        id="product_name"
        aria-describedby="product_name"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">商品描述</label>
      <input id="product_description" class="form-control" />
    </div>

    <div class="dropdown mb-3">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        商品分類
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">分類0</a></li>
        <li><a class="dropdown-item" href="#">分類1</a></li>
        <li><a class="dropdown-item" href="#">分類2</a></li>
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
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        商品保存狀態
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">全新</a></li>
        <li><a class="dropdown-item" href="#">二手</a></li>
      </ul>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>

    <!-- 還沒測試過 新增物品第一步-->
    <!-- <button @click="AddNewItem">新增物品</button> -->
  </form>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponent, SmallHeaderComponent },
  methods: {
    // 新增物品第二步
    AddNewItem() {
      const newItem = {
        id: this.$store.state.items.length,
        title: "新商品",
        detail: "新商品詳情",
        price: "50",
        stock: "55",
      };
      // 新增物品第三步 跑到store
      this.$store.commit("AddItem", newItem);
    },
    // 這邊對應到 store.actions.AddNewItem 固定新增同樣的內容
    AddNewItem2() {
      this.$store.dispatch("AddNewItem");
    },
  },
};
</script>
