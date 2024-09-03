<template>
  <HeaderComponentVue />
  <SmallHeaderComponentVue pageTitle="產品管理" />

  <div
    id="view"
    class="d-block justify-content-start align-items-center w-100 h-100 mt-5 mb-5 pt-5"
  >
    <div class="d-flex p-3 mb-3 border border-black">
      <div class="row">
        <img
          class="img-thumbnail"
          src="img/slide1.png"
          style="width: 10rem; height: 10rem"
        />
        <h5 class="mt-2">商品名稱</h5>
        <h6>$10</h6>
      </div>
      <div class="row">
        <p>商品剩餘數量: 1</p>
        <p>已賣出: 1</p>
        <p>讚: 1</p>
        <p>檢視: 1</p>
      </div>
      <div class="row">
        <button class="btn btn-primary mb-3">付費推廣</button>
        <button class="btn btn-primary mb-3">下架</button>
        <button class="btn btn-primary">編輯</button>
      </div>
    </div>

    <div class="d-flex p-3 mb-3 border border-black">
      <div class="row">
        <img
          class="img-thumbnail"
          src="img/slide1.png"
          style="width: 10rem; height: 10rem"
        />
        <h5 class="mt-2">商品名稱</h5>
        <h6>$10</h6>
      </div>
      <div class="row">
        <p>商品剩餘數量: 1</p>
        <p>已賣出: 1</p>
        <p>讚: 1</p>
        <p>檢視: 1</p>
      </div>
      <div class="row">
        <button class="btn btn-primary mb-3">付費推廣</button>
        <button class="btn btn-primary mb-3">下架</button>
        <button class="btn btn-primary">編輯</button>
      </div>
    </div>
    <div class="d-flex p-3 mb-3 border border-black">
      <div class="row">
        <img
          class="img-thumbnail"
          src="img/slide1.png"
          style="width: 10rem; height: 10rem"
        />
        <h5 class="mt-2">商品名稱</h5>
        <h6>$10</h6>
      </div>
      <div class="row">
        <p>商品剩餘數量: 1</p>
        <p>已賣出: 1</p>
        <p>讚: 1</p>
        <p>檢視: 1</p>
      </div>
      <div class="row">
        <button class="btn btn-primary mb-3">付費推廣</button>
        <button class="btn btn-primary mb-3">下架</button>
        <button class="btn btn-primary">編輯</button>
      </div>
    </div>
    <div class="d-flex p-3 mb-3 border border-black">
      <div class="row">
        <img
          class="img-thumbnail"
          src="img/slide1.png"
          style="width: 10rem; height: 10rem"
        />
        <h5 class="mt-2">商品名稱</h5>
        <h6>$10</h6>
      </div>
      <div class="row">
        <p>商品剩餘數量: 1</p>
        <p>已賣出: 1</p>
        <p>讚: 1</p>
        <p>檢視: 1</p>
      </div>
      <div class="row">
        <button class="btn btn-primary mb-3">付費推廣</button>
        <button class="btn btn-primary mb-3">下架</button>
        <button class="btn btn-primary">編輯</button>
      </div>
    </div>
    <div class="mt-5 mb-5 text-white">為了讓商品不被footer擋住不要刪</div>
  </div>

  <footer class="w-100 p-3 fixed-bottom bg-white w-100">
    <a class="btn btn-primary w-100" href="add_product.html">新增產品</a>
  </footer>
</template>

<script>
import HeaderComponentVue from "../components/HeaderComponent.vue";
import SmallHeaderComponentVue from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponentVue, SmallHeaderComponentVue },
};
</script>
