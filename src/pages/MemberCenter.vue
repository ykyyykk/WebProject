<template>
  <HeaderComponent />
  <h1>MemberCenter</h1>
  <button @click="OnLogout()">SetLogout</button>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { mapActions } from "vuex/dist/vuex.cjs.js";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  components: { HeaderComponent },
  methods: {
    ...mapActions(["SetLogout"]),
    OnLogout() {
      this.SetLogout();
      alert("你已登出");
      this.router.push({ name: "Home" });
    },
  },
  beforeCreate() {
    const store = useStore();
    const router = useRouter();
    if (!store.getters.isLogin) {
      router.push({ name: "Login" });
    }
  },
};
</script>
