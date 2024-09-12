<template>
  <!-- <h1>Is Initialized: {{ isInitialized }}</h1>
  <h1>Is Authorized: {{ isAuthorized }}</h1>
  <h2 v-if="user">Logged in user: {{ user }}</h2>

  <button @click="handleSignIn" :disabled="!isInitialized || isAuthorized">
    Sign In
  </button>
  <button @click="handleSignOut" :disabled="!isAuthorized">Sign Out</button> -->
  <h1>Is Initialized: {{ Vue3GoogleOauth.isInit }}</h1>
  <h1>Is Authorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
  <h2 v-if="user">Logged in user: {{ user }}</h2>

  <button
    @click="handleSignIn"
    :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized"
  >
    Sign In
  </button>
  <button @click="handleSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">
    Sign Out
  </button>
</template>

<script>
import { inject } from "vue";

export default {
  data() {
    return {
      user: "",
      isInitialized: false,
      isAuthorized: false,
    };
  },
  methods: {
    async handleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();

        if (!googleUser) {
          return null;
        }

        this.user = googleUser.getBasicProfile().getEmail();
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async handleSignOut() {
      try {
        await this.$gAuth.signOut();

        this.user = "";
      } catch (error) {
        console.log(error);
      }
    },
    setup() {
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");

      return {
        Vue3GoogleOauth,
      };
    },

    //     async handleSignIn() {
    //       try {
    //         const googleUser = await this.$gAuth.signIn();
    //         if (!googleUser) {
    //           return null;
    //         }
    //         this.user = googleUser.getBasicProfile().getEmail();
    //         this.isAuthorized = true;
    //       } catch (error) {
    //         console.log(error);
    //         return null;
    //       }
    //     },
    //     async handleSignOut() {
    //       try {
    //         await this.$gAuth.signOut();
    //         this.user = "";
    //         this.isAuthorized = false;
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     },
    //     async initializeGAuth() {
    //       try {
    //         await this.$gAuth.load();
    //         this.isInitialized = true;
    //         this.isAuthorized = await this.$gAuth.isAuthorized();
    //       } catch (error) {
    //         console.error("Failed to initialize Google Auth:", error);
    //       }
    //     },
  },
  mounted() {
    this.initializeGAuth();
  },
};
</script>
