<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="購物車" />

  <div v-if="items" id="itmesContainer" class="container mt-5 mb-5">
    <div
      v-for="item in cartItems"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center g-2"
    >
      <div class="d-flex p-3 rounded border border-black mb-3">
        <input
          @click="OnCheck(item.id, item.price, item.buyAmount)"
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
            :src="`${this.GetThumbnail(item.thumbnail, item.category)}`"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
        </router-link>
        <div class="d-block align-items-center w-100">
          <div class="mb-3">{{ item.name }}</div>
          <div class="mb-3">${{ item.price }}</div>
          <div class="d-flex align-items-center w-100">
            <!-- :amount 是單向綁定 給子組件一個叫做amount的變數  -->
            <!-- v-model:amount:item.buyAmount 是雙向綁定 子物件可以修改amount 進而改變父物件item.buyAmount -->
            <!-- @update 當數量變更時觸發-->
            <NumberInputComponent
              class="w-50"
              v-model:amount="item.buyAmount"
              :max="item.stock"
              @update:amount="UpdateCartItemAmount(item.id, $event)"
            />
            <button
              @click="DeleteFromCart(item.id)"
              class="btn btn-outline-danger h-100 ms-2"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
            <span class="ms-2">剩餘庫存: {{ item.stock }}</span>
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
      <button @click="OnCheckOut" class="btn btn-primary fs-4 fw-bolder">
        結帳
      </button>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { API_BASE_URL } from "../config/api";
import { debounce } from "lodash";

// TODOError: 現在還不能調整購物車物品的數量
// TODOWarning: 購物車 同樣的物品應該要疊加
// TODOWarning: 還不確定要不要開放訪客購買 如果不開放 要檢查userID不為0
export default {
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
      selectItems: [],
      isSelectAll: false,
    };
  },
  created() {
    this.debouncedUpdateDatabase = debounce(
      this.UpdateItemAmountInDatabase,
      //1秒後更新 就算跳頁面也會更新 連續按三次按鈕 只會抓最新的
      1000
    );
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
    UpdateCartItemAmount(itemID, newAmount) {
      const item = this.cartItems.find((item) => item.id === itemID);
      if (!item) {
        console.log(`!item`);
        return;
      }
      item.buyAmount = newAmount;
      this.debouncedUpdateDatabase(itemID, newAmount);
    },
    async UpdateItemAmountInDatabase(itemID, amount) {
      try {
        await axios.post(`${API_BASE_URL}/api/changecartamount`, {
          itemID: itemID,
          userID: this.getUserID,
          amount: amount,
        });
        console.log("購物車數量變更成功");
      } catch (error) {
        alert(`購物車數量變更失敗: ${error}`);
        // 購物車數量變更失敗: AxiosError: Network Error
      }
    },
    GetThumbnail(thumbnail, category) {
      if (thumbnail != "") {
        return `img/${thumbnail}`;
      }
      switch (category) {
        case "處理器":
          return "img/CPU.jpg";
        case "主機板":
          return "img/MB.jpg";
        case "記憶體":
          return "img/Ram.jpg";
        case "硬碟":
          return "img/HDD.jpg";
        case "顯示卡":
          return "img/GPU.jpg";
      }
      return;
    },
    async GetCartItems() {
      try {
        // console.log(`getUserID: ${this.getUserID}`);
        const response = await axios.get(`${API_BASE_URL}/api/getcartitems`, {
          params: {
            userID: this.getUserID,
          },
        });
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
        const response = await axios.delete(
          `${API_BASE_URL}/api/deletefromcart/${id}/${this.getUserID}`
        );
        //更改的資料筆數
        const changes = response.data.info.changes;
        if (changes != 0) {
          this.cartItems = this.cartItems.filter((item) => item.id !== id);
          console.log("刪掉物品");
        }
      } catch (error) {
        alert(`錯誤: ${error}`);
      }
    },
    // TODOWarning: 因為現在物品沒有疊加 如果check一個物品 另外一個相同的物品也會跟著check
    OnCheck(id, price, amount) {
      // include比較適合簡單的東西 例如 值 但Object不適用
      const itemExists = this.selectItems.some((item) => item.id === id);
      if (itemExists) {
        //移除特定的id pop是移除最後一個 slice要先拿index splice(index, 1) 有夠奇怪
        this.selectItems = this.selectItems.filter((item) => item.id !== id);
        this.totalPrice -= Number(price * amount);
        this.isSelectAll = false;
        return;
      }

      this.selectItems.push({ id: id, amount: amount });
      this.totalPrice += Number(price * amount);
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

      this.cartItems.forEach((item) => {
        this.selectItems.push({ id: item.id, amount: item.amount });
        this.totalPrice += item.price * item.amount;
      });
    },
    async OnCheckOut() {
      if (this.selectItems.length <= 0) {
        alert("請先選擇物品在結帳");
        return;
      }

      try {
        for (let i = 0; i < this.selectItems.length; i++) {
          console.log(`this.totalPrice: ${this.totalPrice}`);
          console.log(`this.selectItems: ${this.selectItems}`);
          const response = await axios.post(
            `${API_BASE_URL}/api/purchaseitem`,
            {
              id: this.selectItems[i].id,
              amount: this.selectItems[i].amount,
            }
          );
          console.log(`response: ${response}`);
          if (response.data.success) {
            await this.DeleteFromCart(this.selectItems[i].id);
          }
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
  },
};
</script>
