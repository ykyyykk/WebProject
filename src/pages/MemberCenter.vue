<template>
  <HeaderComponent />
  <h1>MemberCenter</h1>
  <button @click="OnLogout()">SetLogout</button>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: { HeaderComponent },
  methods: {
    ...mapActions(["SetLogout"]),
    OnLogout() {
      console.log("OnLogout");
      this.SetLogout();
    },
  },
};
</script>
