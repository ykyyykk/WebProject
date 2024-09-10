<template>
  <!-- 這邊是去public/img取照片 不懂為什麼沒辦法在src/assets/img-->
  <router-link
    :to="{
      name: 'ItemDetail',
      params: { id: item.id },
    }"
  >
    <img :src="item.imageUrl" class="card-img-top pt-3" />
  </router-link>
  <div class="d-flex align-items-center">
    <div class="card-body">
      <h5>{{ item.name }}</h5>
      <span>${{ item.price }}</span>
    </div>
    <button class="btn btn-outline-danger">
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
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
