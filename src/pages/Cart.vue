<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="購物車" />

  <div v-if="items" id="itmesContainer" class="container mt-5 mb-5">
    <div
      v-for="item in cartItems"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center g-2"
    >
      <div class="d-flex p-2 rounded border border-black mb-2">
        <input
          @click="OnCheck(item.id, item.price)"
          :checked="selectItems.includes(item.id)"
          class="ms-2 me-3"
          type="checkbox"
        />
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
            <button
              @click="DeleteFromCart(item.id)"
              class="btn btn-outline-danger h-100 ms-2"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 不能省略 為了XS不遮住Item -->
  <div class="text-center">-</div>

  <div
    class="d-flex justify-content-between align-items-center fixed-bottom py-1 px-3 bg-warning rounded rounded-2 m-1"
  >
    <div>
      <input @click="OnSelectAll()" type="checkbox" />
      <span>全選</span>
      <span class="ms-5">總金額$ {{ totalPrice }}</span>
    </div>

    <div>
      <button class="btn btn-primary fs-4 fw-bold">結帳</button>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import axios from "axios";
import { mapGetters } from "vuex";

// TODOWarning: 購物車 同樣的物品應該要疊加
// TODOWarning: 還不確定要不要開放訪客購買 如果不開放 要檢查userID不為0
export default {
  data() {
    return {
      cartItems: [],
      //TODOWarning: 這邊不知道會不會有問題 每個item都共用
      buyAmount: 1,
      totalPrice: 0,
      selectItems: [],
      isSelectAll: false,
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
        // console.log(`getUserID: ${this.getUserID}`);
        const response = await axios.get(
          "http://localhost:3000/api/getcartitems",
          {
            params: {
              userID: this.getUserID,
            },
          }
        );
        // console.log(response.data);
        if (response.data.success) {
          this.cartItems = response.data.items;
        }
      } catch (error) {
        alert(`錯誤: ${error}`);
      }
    },
    async DeleteFromCart(id) {
      console.log(`DeleteFromCart: ${id}`);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/deletefromcart",
          {
            itemID: id,
            userID: this.getUserID,
          }
        );
        // console.log(response.data);
        //更改的資料筆數
        const changes = response.data.info.changes;
        // console.log(changes);
        if (changes != 0) {
          this.cartItems = this.cartItems.filter((item) => item.id !== id);
          console.log("刪掉物品");
        }
      } catch (error) {
        alert(`錯誤: ${error}`);
      }
    },
    OnCheck(id, price) {
      //include比較適合簡單的東西 例如 值 但Object不適用
      if (this.selectItems.includes(id)) {
        //移除特定的id pop是移除最後一個 slice要先拿index splice(index, 1) 有夠奇怪
        this.selectItems = this.selectItems.filter(
          (storedID) => storedID !== id
        );
        this.totalPrice -= Number(price);
        this.isSelectAll = false;
        return;
      }
      this.selectItems.push(id);
      this.totalPrice += Number(price);
    },
    OnSelectAll() {
      if (this.isSelectAll) {
        this.selectItems = [];
        this.totalPrice = 0;
        this.isSelectAll = false;
        return;
      }
      // 重置避免 重復增加
      this.selectItems = [];
      this.totalPrice = 0;
      this.isSelectAll = true;
      for (let i = 0; i < this.cartItems.length; i++) {
        this.selectItems.push(this.cartItems[i].id);
        this.totalPrice += this.cartItems[i].price;
      }
    },
  },
};
</script>
