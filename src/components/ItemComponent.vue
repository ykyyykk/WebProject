<template>
  <div class="rounded mb-3 shadow p-3 bg-white">
    <!-- 這邊是去public/img取照片 不懂為什麼沒辦法在src/assets/img-->
    <router-link
      :to="{
        name: 'ItemDetail',
        params: { id: item.id },
      }"
    >
      <div class="d-flex justify-content-center align-content-center">
        <img
          :src="this.GetThumbnail(item.thumbnail, item.category)"
          class="w-100 object-fit-scale"
        />
      </div>
    </router-link>
    <div class="d-flex justify-content-between align-items-center">
      <div id="left" class="col-xxl-11 col-10">
        <p class="fs-6 fw-bolder m-0 single-ellipsis">
          {{ item.name }}
        </p>
        <span>${{ item.price }}</span>
      </div>

      <button
        @click="ToggleCartItem(item.id, $event)"
        :class="[
          'btn',
          'col-xxl-1',
          'col-2',
          'd-flex',
          'justify-content-center',
          IsItemInCart(item.id) ? 'btn-danger' : 'btn-outline-danger',
        ]"
      >
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user", "cartItems"]),
  },
  methods: {
    GetThumbnail(thumbnail, category) {
      // 目前這邊在localhost顯示不出來是正常的 因為本地端根本沒有 一樣的照片 需要新增下載伺服器圖片
      if (thumbnail != "") {
        return `img/${thumbnail}`;
      }
      switch (category) {
        case "處理器":
          return "img/CPU.jpg";
        case "主機板":
          return "img/MB.jpg";
        case "記憶體":
          return "img/Ram.jpg";
        case "硬碟":
          return "img/HDD.jpg";
        default:
          return "img/GPU.jpg";
      }
    },
    IsItemInCart(id) {
      return this.cartItems.some((cartItem) => cartItem.id === id);
    },
    async ToggleCartItem(id, event) {
      // 直接把button傳進來
      const button = event.currentTarget;
      const isCurrentlyInCart = button.classList.contains("btn-danger");
      //不要用this.IsItemInCart 因為this.cartItems
      if (isCurrentlyInCart) {
        await this.RemoveFromCart(id);
        button.classList.remove("btn-danger");
        button.classList.add("btn-outline-danger");
      } else {
        await this.AddToCart(id, 1);
        button.classList.remove("btn-outline-danger");
        button.classList.add("btn-danger");
      }
    },
    async AddToCart(id, amount) {
      if (this.user == null) {
        alert("請先登入再加入購物車");
        return;
      }
      try {
        await axios.post(`${API_BASE_URL}/api/addtocart`, {
          itemID: id,
          userID: this.user.id,
          amount: amount,
        });
        // PopupComponent 放ItemComponent有點怪 所以用alert
        alert(`新增至購物車成功`);
      } catch (error) {
        alert("新增至購物車失敗", error);
      }
    },
    async RemoveFromCart(id) {
      try {
        //DELETE 通常不包含 request 需要從URL獲取參數
        await axios.delete(
          `${API_BASE_URL}/api/deletefromcart/${id}/${this.user.id}`
        );
      } catch (error) {
        alert("從購物車移除失敗", error);
      }
    },
  },
};
</script>

<style>
/* 超過第二行被...取代 */
.single-ellipsis {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
