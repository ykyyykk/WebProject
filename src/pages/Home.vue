<template>
  <HeaderComponent />
  <SwiperComponent :pages="pages" />

  <div id="itmesContainer" class="container">
    <div class="row d-flex justify-content-start align-items-center p-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="card col-lg-3 col-sm-4 col-6"
      >
        <ItemComponent :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: { HeaderComponent, SwiperComponent, ItemComponent },
  computed: {
    ...mapGetters(["getItems", "getPages"]),
    // 給v-for用的
    items() {
      return this.getItems;
    },
    pages() {
      return this.getPages;
    },
  },
};
</script>
