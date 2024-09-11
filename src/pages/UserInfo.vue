<template>
  <HeaderComponentVue />
  <SmallHeaderComponentVue pageTitle="使用者資料" />
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
      <input class="form-control" />
    </div>

    <div class="mb-3">
      <label class="form-label">商品數量</label>
      <input class="form-control" />
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
  </form>
</template>

<script>
import HeaderComponentVue from "../components/HeaderComponent.vue";
import SmallHeaderComponentVue from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponentVue, SmallHeaderComponentVue },
};
</script>
