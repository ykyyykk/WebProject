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
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { HeaderComponent, SmallHeaderComponent },
  async mounted() {
    await this.GetCartItems();
  },
  methods: {
    ...mapGetters(["getUserID"]),
    async GetCartItems() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getcartitems",
          {
            userID: this.getUserID,
          }
        );
      } catch (error) {
        alert("錯誤: ", error);
      }
    },
  },
};
</script>
