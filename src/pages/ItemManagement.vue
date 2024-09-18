<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="產品管理" />

  <div v-if="items" class="container mt-5 mb-5">
    <div
      v-for="item in items"
      :key="item.id"
      class="row d-flex justify-content-start align-items-center g-2"
    >
      <div class="d-flex p-3 rounded mb-3 shadow">
        <input
          @click="OnCheck(item.id, item.price, item.buyAmount)"
          :checked="selectItems.includes(item.id)"
          class="ms-2 me-3"
          type="checkbox"
        />

        <router-link
          class="d-flex justify-content-center align-items-center"
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
          <div class="">{{ item.name }}</div>
          <div class="">價格: ${{ item.price }}</div>
          <div class="">剩餘庫存: {{ item.stock }}</div>
          <div class="">已賣出: 已賣出份數</div>
          <div class="">評分: 評分1/5</div>
          <div class="">檢視: 檢視次數</div>
        </div>

        <div class="d-block">
          <button class="mb-3 btn btn-outline-primary w-100">付費推廣</button>
          <button
            @click="DeleteFromDatabase(item.id)"
            class="mb-3 btn btn-outline-primary w-100"
          >
            下架
          </button>
          <button class="btn btn-outline-primary w-100">編輯</button>
        </div>
      </div>
    </div>
    <!-- z-0為了讓sidebar蓋住 -->
    <footer class="w-100 p-3 fixed-bottom bg-white w-100 z-0">
      <router-link class="btn btn-primary w-100" :to="{ name: 'AddItem' }"
        >新增產品</router-link
      >
    </footer>
  </div>

  <!-- 不能省略 為了XS不遮住Item -->
  <div class="text-center">-</div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import NumberInputComponent from "../components/NumberInputComponent.vue";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { debounce } from "lodash";
import { mapActions, mapState } from "vuex/dist/vuex.cjs.js";

// TODOWarning: 購物車 同樣的物品應該要疊加
// TODOWarning: 還不確定要不要開放訪客購買 如果不開放 要檢查userID不為0
export default {
  data() {
    return {
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
    ...mapState(["user", "items"]),
  },
  methods: {
    ...mapActions(["SetAllItems"]),
    async UpdateItemAmountInDatabase(itemID, amount) {
      try {
        await axios.post(`${API_BASE_URL}/api/changecartamount`, {
          itemID: itemID,
          userID: this.user.id,
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
          return "../../public/img/CPU.jpg";
        case "主機板":
          return "../../public/img/MB.jpg";
        case "記憶體":
          return "../../public/img/Ram.jpg";
        case "硬碟":
          return "../../public/img/HDD.jpg";
        case "顯示卡":
          return "../../public/img/GPU.jpg";
      }
      return;
    },
    async DeleteFromDatabase(itemID) {
      console.log(`DeleteFromCart: ${itemID}`);
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/deletefromdatabase/${itemID}/${this.user.id}`
        );

        console.log(response.data.success);
        if (response.data.success) {
          //更改的資料筆數
          this.SetAllItems({
            items: this.items.filter((item) => item.id != itemID),
          });
          alert("下架成功");
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
