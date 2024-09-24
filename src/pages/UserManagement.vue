<template>
  <div
    v-if="this.allUser"
    class="container mt-5 mb-5 p-3 shadow overflow-x-scroll"
  >
    <div class="d-flex mb-3 shadow-sm m-0 p-3 w-100">
      <!-- TODO: 當沒有CheckAll時 顯示半check -->
      <input @click="OnCheckAll()" class="ms-2 me-3" type="checkbox" />
      <button
        @click="ChagneSortTag('ID')"
        class="p-0 me-3 border border-black"
        style="width: 5rem"
      >
        <i
          v-if="this.sortTag === 'ID' && !this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="this.sortTag === 'ID' && this.isDescending"
          class="fa-solid fa-angle-down"
        ></i>
        ID
      </button>
      <button
        @click="ChagneSortTag('Name')"
        class="p-0 me-3 border border-black"
        style="width: 5rem"
      >
        <i
          v-if="this.sortTag === 'Name' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="this.sortTag === 'Name' && !this.isDescending"
          class="fa-solid fa-angle-down"
        ></i>
        姓名
      </button>
      <button
        @click="ChagneSortTag('PhoneNumber')"
        class="p-0 me-3 border border-black"
        style="width: 7rem"
      >
        <i
          v-if="this.sortTag === 'PhoneNumber' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="this.sortTag === 'PhoneNumber' && !this.isDescending"
          class="fa-solid fa-angle-down"
        ></i>
        電話
      </button>
      <button
        @click="ChagneSortTag('Email')"
        class="p-0 me-3 border border-black"
        style="width: 15rem"
      >
        <i
          v-if="this.sortTag === 'Email' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="this.sortTag === 'Email' && !this.isDescending"
          class="fa-solid fa-angle-down"
        ></i>
        Email
      </button>
      <button
        @click="ChagneSortTag('Password')"
        class="p-0 me-3 border border-black"
        style="width: 15rem"
      >
        <i
          v-if="this.sortTag === 'Password' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="this.sortTag === 'Password' && !this.isDescending"
          class="fa-solid fa-angle-down"
        ></i>
        密碼
      </button>
      <button
        @click="ChagneSortTag('TotalPurchaseAmount')"
        class="p-0 me-3 border border-black"
        style="width: 10rem"
      >
        <i
          v-if="this.sortTag === 'TotalPurchaseAmount' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="
            this.sortTag === 'TotalPurchaseAmount' && !this.isDescending
          "
          class="fa-solid fa-angle-down"
        ></i>
        已購買商品數量
      </button>
      <button
        @click="ChagneSortTag('TotalPurchasePrice')"
        class="p-0 me-3 border border-black"
        style="width: 7.5rem"
      >
        <i
          v-if="this.sortTag === 'TotalPurchasePrice' && this.isDescending"
          class="fa-solid fa-angle-up"
        ></i>
        <i
          v-else-if="
            this.sortTag === 'TotalPurchasePrice' && !this.isDescending
          "
          class="fa-solid fa-angle-down"
        ></i>
        購買總金額
      </button>
      <!-- <button class="btn btn-primary" style="width: 7.5rem" :disabled="true">
        新增管理者
      </button> -->
    </div>

    <div
      v-for="user in this.allUser"
      :key="user"
      class="row d-flex justify-content-start m-0 align-items-center position-relative"
    >
      <div class="d-flex p-3 rounded mb-3 shadow-sm">
        <div class="d-flex col-12">
          <input
            @click="OnCheck(user.id)"
            :checked="selectUsers.includes(user.id)"
            class="ms-2 me-3"
            type="checkbox"
          />

          <input
            :value="user.id"
            class="me-3 border border-black"
            style="width: 5rem"
          />

          <input
            :value="user.name"
            class="me-3 border border-black"
            style="width: 5rem"
          />

          <input
            :value="user.phoneNumber"
            class="me-3 border border-black"
            style="width: 7rem"
          />

          <input
            :value="user.email"
            class="me-3 border border-black"
            style="width: 15rem"
          />

          <input
            :value="user.password"
            class="me-3 border border-black"
            style="width: 15rem"
          />

          <input
            :value="user.totalPurchaseAmount"
            class="me-3 border border-black"
            style="width: 10rem"
          />

          <input
            :value="user.totalPurchasePrice"
            class="me-3 border border-black"
            style="width: 7.5rem"
          />
        </div>

        <div
          class="p-0 m-0 border border-black flex-row position-absolute"
          style="right: 1rem; top: 19.2%"
        >
          <button
            @click="this.SaveUser(user.id)"
            class="btn-sm btn btn-outline-primary"
          >
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
          <button
            @click="this.DeleteUser(user.id)"
            class="btn-sm btn btn-outline-danger"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
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
import { API_BASE_URL } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";

export default {
  data() {
    return {
      allUser: [],
      selectUsers: [],
      isSelectAll: false,
      sortTag: "ID",
      isDescending: false,
    };
  },
  components: { HeaderComponent, SmallHeaderComponent, NumberInputComponent },
  computed: {
    ...mapState(["user", "items"]),
  },
  async beforeMount() {
    await this.GetAllUser();
  },
  methods: {
    async GetAllUser() {
      const response = await axios.get(`${API_BASE_URL}/api/getalluser`);
      console.log(response.data.users);
      this.allUser = response.data.users;
    },
    async DeleteUser(deleteID) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/deleteuser/${deleteID}/${this.user.id}`
        );

        if (response.data.success) {
          //更改的資料筆數
          this.allUser = this.allUser.filter((user) => user.id != deleteID);
          alert("刪除成功");
        }
      } catch (error) {
        alert(`錯誤: ${error}`);
      }
    },
    ChagneSortTag(sortTag) {
      // console.log(this.sortTag);
      if (this.sortTag === sortTag) {
        if (!this.isDescending) {
          this.isDescending = true;
          this.Sort();
          return;
        }
        this.sortTag = "";
        this.isDescending = false;
        this.Sort();
        return;
      }
      this.sortTag = sortTag;
      this.Sort();
    },
    Sort() {
      switch (this.sortTag) {
        case "ID":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.id - a.id;
            }
            return a.id - b.id;
          });
        case "Name":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.name - a.name;
            }
            return a.name - b.name;
          });
        case "PhoneNumber":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.phoneNumber - a.phoneNumber;
            }
            return a.phoneNumber - b.phoneNumber;
          });
        case "Email":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.email - a.email;
            }
            return a.email - b.email;
          });
        case "Password":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.password - a.password;
            }
            return a.password - b.password;
          });
        case "TotalPurchaseAmount":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.totalPurchaseAmount - a.totalPurchaseAmount;
            }
            return a.totalPurchaseAmount - b.totalPurchaseAmount;
          });
        case "TotalPurchasePrice":
          return this.allUser.sort((a, b) => {
            if (this.isDescending) {
              return b.totalPurchasePrice - a.totalPurchasePrice;
            }
            return a.totalPurchasePrice - b.totalPurchasePrice;
          });
      }
    },
    OnCheck(id) {
      // include比較適合簡單的東西 例如 值 但Object不適用
      const itemExists = this.selectUsers.some((user) => user.id === id);
      if (itemExists) {
        //移除特定的id pop是移除最後一個 slice要先拿index splice(index, 1) 有夠奇怪
        this.selectUsers = this.selectUsers.filter((user) => user.id !== id);
        this.isSelectAll = false;
        return;
      }

      this.selectUsers.push({ id: id });
    },
    OnCheckAll() {
      if (this.isSelectAll) {
        this.selectUsers = [];
        this.isSelectAll = false;
        return;
      }
      // 重置避免 重復增加
      this.selectUsers = [];
      this.isSelectAll = true;

      this.items.forEach((user) => {
        this.selectUsers.push(user.id);
      });
    },
  },
};
</script>

<style>
html {
  /* 全域讓預設ScorllBar 瘦一點好看點 */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

body::-webkit-scrollbar {
  width: 12px;
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

body::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
