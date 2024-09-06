<template>
  <HeaderComponent />
  <SwiperComponent />

  <div id="itmesContainer" class="container">
    <div class="row d-flex justify-content-start align-items-center p-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="card col-lg-3 col-sm-4 col-6"
      >
        <img
          src="../assets/img/slide1.png"
          class="card-img-top"
          alt="商品圖片"
        />
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
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: { HeaderComponent, SwiperComponent },
  computed: {
    ...mapGetters(["isLogin", "getUserID", "getItems"]),
    // 給v-for用的
    items() {
      return this.getItems;
    },
  },
};
</script>
