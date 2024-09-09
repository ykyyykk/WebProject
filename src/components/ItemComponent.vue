<template>
  <!-- 這邊是去public/img取照片 不懂為什麼沒辦法在src/assets/img-->
  <img :src="item.imageUrl" class="card-img-top pt-3" />
  <div class="card-body">
    <h5 class="card-title">{{ item.name }}</h5>
    <router-link
      :to="{
        name: 'ItemDetail',
        params: { id: item.id },
      }"
      class="text-danger bg-yellow text-decoration-none stretched-link"
    >
      ${{ item.price }}</router-link
    >
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
};
</script>
