<template>
  <header
    class="d-flex justify-content-between align-items-center p-3 bg-white"
    style="height: 4rem"
  >
    <div class="d-flex justify-content-start align-items-center w-100">
      <!-- 暫時取消 不知道要塞什麼 -->
      <!-- <button
        class="border border-0 bg-transparent"
        @click="isSideBarOpen = true"
      >
        <i class="fa-solid fa-bars fs-2"></i>
      </button> -->

      <router-link
        :to="{ name: 'Home' }"
        class="text-decoration-none ms-2"
        style="width: 12rem"
      >
        <img style="width: 100%; height: auto" src="/static/Logo.png" />
      </router-link>

      <!-- 測試用 失敗 -->
      <!-- <div class="ms-2 d-none d-md-block w-50 p-0">
        <CustomInputComponent />
      </div> -->
      <div class="ms-2 d-none d-md-block w-50 p-0">
        <SearchInputComponent />
      </div>
    </div>

    <div class="d-flex justify-content-end align-items-center gap-3">
      <button
        @click="ToggleSearchWindow()"
        class="border border-0 bg-transparent d-md-none"
      >
        <i class="fa-solid fa-magnifying-glass fs-5"></i>
      </button>

      <router-link
        v-if="isManager"
        :to="{ path: '/dashboard' }"
        class="bg-transparent text-black"
      >
        <i class="fa-solid fa-store fs-5"></i>
      </router-link>

      <!-- TODOAdd: 新增通知 -->
      <!-- TODOAdd: 通知同步發送email-->
      <!-- TODOAdd: 取消訂閱通知email-->
      <!-- 不要用router-link 不知道為什麼 會呼叫到Cart 明明名稱不一樣 -->
      <button
        @click="this.LoginOnClick()"
        class="bg-transparent text-black border border-0"
      >
        <i class="fa-solid fa-user fs-5"></i>
      </button>

      <button
        @click="this.CartOnClick()"
        class="bg-transparent text-black ms-auto me-2 border border-0"
      >
        <i class="fa-solid fa-cart-shopping fs-5"></i>
      </button>
    </div>
  </header>

  <SideBarComponent v-model:isSideBarOpen="isSideBarOpen" />
  <div
    class="w-100 h-100 position-absolute left-0 bg-white p-3 z-3"
    style="top: 4rem"
    v-if="isSearchWindowOpen"
  >
    <SearchInputComponent @ToggleSearchWindow="ToggleSearchWindow" />
  </div>
</template>

<script>
import SideBarComponent from "../components/SideBarComponent.vue";
import SearchInputComponent from "./SearchInputComponent.vue";
import CustomInputComponent from "./CustomInputComponent.vue";
import { mapState } from "vuex/dist/vuex.cjs.js";

export default {
  components: { SideBarComponent, SearchInputComponent, CustomInputComponent },
  data() {
    return {
      isSideBarOpen: false,
      isSearchWindowOpen: false,
      placeholder: "abc",
      inputValue: "inputValue",
    };
  },
  computed: {
    ...mapState(["user", "isManager"]),
  },
  methods: {
    LoginOnClick() {
      if (this.user == null) {
        this.$router.push({ name: "Login" });
        return;
      }
      this.$router.push({ name: "MemberCenter" });
      return;
    },
    CartOnClick() {
      if (this.user == null) {
        alert("請先登入");
        this.$router.push({ name: "Login" });
        return;
      }
      this.$router.push({ name: "Cart" });
      return;
    },
    ToggleSearchWindow() {
      this.isSearchWindowOpen = !this.isSearchWindowOpen;

      if (this.isSearchWindowOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
        this.searchQuery = "";
        this.showDropdown = false;
      }
    },
    UpdateWindowWidth() {
      if (window.innerWidth >= 767) {
        this.isSearchWindowOpen = false;
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.UpdateWindowWidth);
  },
  mounted() {
    window.addEventListener("resize", this.UpdateWindowWidth);
  },
};
</script>
