<template>
  <HeaderComponent />
  <SmallHeaderComponet pageTitle="產品管理" />

  <div class="p-3 w-100 h-100 mt-5">
    <a class="btn btn-outline-primary" href="product_management.html">
      產品管理
    </a>

    <div class="mb-5">
      <h4>訂單管理</h4>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        待出貨
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        不成立
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        退貨/退款
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        評價
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        已賣出
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        低庫存
      </a>
      <a class="btn btn-outline-primary" href="">
        <p>{{ amount }}</p>
        未處理
      </a>
    </div>

    <div>
      <h4>用戶管理</h4>
      <a class="btn btn-outline-primary" href=""> 查看用戶 </a>
      <a class="btn btn-outline-primary" href=""> 編輯用戶 </a>
      <a class="btn btn-outline-primary" href=""> 刪除用戶 </a>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponet from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponent, SmallHeaderComponet },
};
</script>
