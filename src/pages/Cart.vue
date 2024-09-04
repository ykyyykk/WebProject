<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="購物車" />

  <div id="itmesContainer" class="container mt-5">
    <div
      v-for="item in items"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center g-2"
    >
      <div class="d-flex p-2 rounded border border-black mb-2">
        <input class="ms-3 me-3" type="checkbox" />
        <router-link
          :to="{
            name: 'ItemDetail',
            params: { id: item.id, title: item.name, detail: item.detail },
          }"
        >
          <img
            src="../assets/img/slide1.png"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
        </router-link>
        <div class="d-block align-items-center">
          <div class="mb-2">{{ item.name }}</div>
          <div class="mb-2">${{ item.price }}</div>
          <div class="input-group mb-3 w-50">
            <button class="input-group-text btn btn-outline-secondary">
              -
            </button>
            <input
              type="number"
              class="form-control text-center border border-secondary"
              placeholder="數量"
              value="1"
              min="1"
            />
            <button class="input-group-text btn btn-outline-primary">+</button>

            <button class="input-group-text btn btn-outline-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponent, SmallHeaderComponent },
  data() {
    return {
      items: [
        { title: "商品名稱0", id: 0, detail: "詳細資訊0", price: "10" },
        { title: "商品名稱1", id: 1, detail: "詳細資訊1", price: "20" },
        { title: "商品名稱2", id: 2, detail: "詳細資訊2", price: "30" },
        { title: "商品名稱3", id: 3, detail: "詳細資訊3", price: "40" },
      ],
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>
