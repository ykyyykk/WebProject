<template>
  <div class="rounded my-2 shadow p-3">
    <!-- 這邊是去public/img取照片 不懂為什麼沒辦法在src/assets/img-->
    <router-link
      :to="{
        name: 'ItemDetail',
        params: { id: item.id },
      }"
    >
      <!-- style="height: 400px" -->
      <!-- object-fit-contain -->
      <!-- object-fit-cover -->
      <!-- object-fit-fill -->
      <!-- 不會模糊 但是圖片變小 整體沒變小 -->
      <!-- object-fit-scale -->
      <div
        class="d-flex justify-content-center align-content-center"
        style="height: 300px"
      >
        <!-- TODORWD -->
        <!-- 統一300px太高 auto不統一但剛好 -->
        <!-- style="height: auto" -->
        <img :src="item.imageUrl" class="w-100 object-fit-scale" />
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
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getUserID", "getCartItems"]),
  },
  methods: {
    IsItemInCart(id) {
      return this.getCartItems.some((cartItem) => cartItem.id === id);
    },
    async ToggleCartItem(id, event) {
      // 直接把button傳進來
      const button = event.currentTarget;
      const isCurrentlyInCart = button.classList.contains("btn-danger");
      //不要用this.IsItemInCart 因為this.getCartItems不會即時更新
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
      // if (!this.isLogin) {
      //   alert("請先登入再加入購物車");
      //   return;
      // }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/addtocart",
          {
            itemID: id,
            userID: this.getUserID,
            amount: amount,
          }
        );
        console.log("新增至購物車成功");
      } catch (error) {
        alert("新增至購物車失敗", error);
      }
    },
    async RemoveFromCart(id) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/deletefromcart",
          {
            itemID: id,
            userID: this.getUserID,
          }
        );
        console.log("移除至購物車成功");
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
