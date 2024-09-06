<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="購物車" />

  <div v-if="items" id="itmesContainer" class="container mt-5">
    <div
      v-for="item in cartItems"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center g-2"
    >
      <div class="d-flex p-2 rounded border border-black mb-2">
        <input class="ms-2 me-3" type="checkbox" />
        <router-link
          :to="{
            name: 'ItemDetail',
            params: { id: item.id },
          }"
        >
          <img
            src="../assets/img/slide1.png"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
        </router-link>
        <div class="d-block align-items-center w-100">
          <div class="mb-2">{{ item.name }}</div>
          <div class="mb-2">${{ item.price }}</div>
          <div class="d-flex w-100">
            <NumberInputComponent
              class="w-50"
              v-model="this.buyAmount"
              :max="item.stock"
            />
            <button class="btn btn-outline-danger h-100 ms-2">
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
import NumberInputComponent from "../components/NumberInputComponent.vue";
import axios from "axios";
import { mapGetters } from "vuex";

// TODOWarning: 購物車 同樣物品會疊加
export default {
  data() {
    return {
      cartItems: [],
      buyAmount: 1,
    };
  },
  components: { HeaderComponent, SmallHeaderComponent, NumberInputComponent },
  computed: {
    ...mapGetters(["isLogin", "getUserID", "getItems"]),
    // 給v-for用的
    items() {
      return this.getItems;
    },
  },
  async mounted() {
    await this.GetCartItems();
  },
  methods: {
    async GetCartItems() {
      try {
        console.log(`getUserID: ${this.getUserID}`);
        const response = await axios.post(
          "http://localhost:3000/api/getcartitems",
          {
            userID: this.getUserID,
          }
        );
        console.log(response.data.items);
        this.cartItems = response.data.items;
      } catch (error) {
        alert("錯誤: ", error);
      }
    },
  },
};
</script>
