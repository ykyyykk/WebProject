<template>
  <HeaderComponent />
  <SwiperComponent />

  <div id="itmesContainer" class="container p-2">
    <div
      v-for="item in items"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center mt-3"
    >
      <div class="card col-lg-3 col-sm-4 col-6">
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
              params: { id: item.id, title: item.name, detail: item.detail },
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
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SwiperComponent from "../components/SwiperComponent.vue";

export default {
  components: { HeaderComponent, SwiperComponent },
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    await this.GetAllItem();
  },
  methods: {
    async GetAllItem() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getallitem"
        );
        this.items = response.data.items;
        console.log("取得所有物品成功");
      } catch (error) {
        alert("取得所有物品失敗", error);
      }
    },
  },
};
</script>
