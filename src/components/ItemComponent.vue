<template>
  <div class="rounded my-2 shadow p-3">
    <!-- 這邊是去public/img取照片 不懂為什麼沒辦法在src/assets/img-->
    <router-link
      :to="{
        name: 'ItemDetail',
        params: { id: item.id },
      }"
    >
      <img :src="item.imageUrl" class="w-100" />
    </router-link>
    <div class="d-flex align-items-center">
      <div class="w-100">
        <p class="fs-5 fw-bolder m-0">{{ item.name }}</p>
        <span>${{ item.price }}</span>
      </div>
      <button class="btn btn-outline-danger">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    OnClickCart() {
      console.log("OnClickCart()");
    },
  },
};
</script>
