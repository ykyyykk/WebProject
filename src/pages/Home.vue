<template>
  <HeaderComponent />
  <SwiperComponent :pages="pages" />

  <!-- 沒用 要先裝popover插件 -->
  <!-- <button
    type="button"
    class="btn btn-lg btn-danger"
    data-bs-toggle="popover"
    data-bs-title="Popover title"
    data-bs-content="And here's some amazing content. It's very engaging. Right?"
  >
    Click to toggle popover
  </button> -->

  <div id="itmesContainer" class="m-0 w-100 p-0">
    <div
      class="row d-flex justify-content-center align-items-center p-3 w-100 m-0"
    >
      <div v-for="item in items" :key="item.id" class="col-lg-3 col-sm-4 col-6">
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
