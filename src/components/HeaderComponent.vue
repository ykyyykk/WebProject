<template>
  <header
    class="d-flex justify-content-between align-items-center p-2"
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

      <!-- TODOAdd: 大視窗的搜尋還沒做 -->
      <input
        type="text"
        class="form-control ms-2 d-none d-md-block w-50"
        placeholder="查詢"
      />
    </div>

    <div class="d-flex justify-content-end align-items-center gap-2">
      <button
        @click="ToggleSearchWindow()"
        class="border border-0 bg-transparent d-md-none"
      >
        <i class="fa-solid fa-magnifying-glass fs-5"></i>
      </button>

      <router-link :to="{ name: 'AddItem' }" class="bg-transparent text-black">
        新增物品
      </router-link>

      <router-link :to="{ name: 'Service' }" class="bg-transparent text-black">
        <img
          style="width: 1.3rem; height: 1.3rem"
          src="../assets/img/customer-service.png"
        />
      </router-link>

      <router-link :to="CheckLoginStatus" class="bg-transparent text-black">
        <i class="fa-solid fa-user"></i>
      </router-link>

      <router-link
        :to="{ name: 'Cart' }"
        class="bg-transparent text-black ms-auto me-2"
      >
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
    </div>
  </header>

  <SideBarComponent v-model:isSideBarOpen="isSideBarOpen" />
  <SearchWindowComponent :isOpen="isSearchWindowOpen" />
</template>

<script>
import SideBarComponent from "../components/SideBarComponent.vue";
import SearchWindowComponent from "./SearchWindowComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: { SideBarComponent, SearchWindowComponent },
  data() {
    return {
      isSideBarOpen: false,
      isSearchWindowOpen: false,
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    // ...mapGetters(["isLogin", "getUser"]),
    CheckLoginStatus() {
      // console.log(this.getUser);
      return this.isLogin ? { name: "MemberCenter" } : { name: "Login" };
    },
  },
  methods: {
    ToggleSearchWindow() {
      this.isSearchWindowOpen = !this.isSearchWindowOpen;
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
