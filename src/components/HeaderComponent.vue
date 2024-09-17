<template>
  <header
    class="d-flex justify-content-between align-items-center p-3 bg-white"
    style="height: 4rem"
  >
    <div class="d-flex justify-content-start align-items-center w-100">
      <button
        class="border border-0 bg-transparent"
        @click="isSideBarOpen = true"
      >
        <i class="fa-solid fa-bars fs-2"></i>
      </button>

      <router-link
        :to="{ name: 'Home' }"
        class="text-decoration-none ms-2"
        style="width: 12rem"
      >
        <img
          style="width: 100%; height: auto"
          src="../assets/img/Decathlon_Logo.png"
        />
      </router-link>

      <div class="form-control ms-2 d-none d-md-block w-50 p-0">
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

      <router-link :to="{ name: 'AddItem' }" class="bg-transparent text-black">
        <i class="fa-solid fa-arrow-up-from-bracket fs-5"></i>
      </router-link>

      <router-link :to="{ name: 'Service' }" class="bg-transparent text-black">
        <i class="fa-regular fa-circle-question fs-5"></i>
      </router-link>

      <!-- TODOAdd: 新增通知 -->
      <!-- TODOAdd: 通知同步發送email-->
      <!-- TODOAdd: 取消訂閱通知email-->
      <router-link :to="CheckLoginStatus" class="bg-transparent text-black">
        <i class="fa-solid fa-user fs-5"></i>
      </router-link>

      <router-link
        :to="{ name: 'Cart' }"
        class="bg-transparent text-black ms-auto me-2"
      >
        <i class="fa-solid fa-cart-shopping fs-5"></i>
      </router-link>
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
import { mapState } from "vuex/dist/vuex.cjs.js";
import SideBarComponent from "../components/SideBarComponent.vue";
import SearchInputComponent from "./SearchInputComponent.vue";

export default {
  components: { SideBarComponent, SearchInputComponent },
  data() {
    return {
      isSideBarOpen: false,
      isSearchWindowOpen: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    CheckLoginStatus() {
      return this.user == null ? { name: "Login" } : { name: "MemberCenter" };
    },
  },
  methods: {
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
