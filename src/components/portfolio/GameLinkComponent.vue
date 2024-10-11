<template>
  <div v-for="gameLink in gameLinks" :key="gameLink">
    <a
      class="text-decoration-none btn m-0 d-flex flex-xxl-column flex-xl-column flex-md-column flex-sm-column flex-column align-items-center justify-content-xl-between justify-content-xxl-center col-xl-12 flex-nowrap-4 col-xxl"
      :href="gameLink.href"
    >
      <p class="text-white fs-3">GooglePlay</p>
      <img :src="gameLink.src" style="width: 100px; height: 100px" />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameLinks: [
        {
          href: "https://store.steampowered.com/app/1483600/_/",
          src: "/static/Steam逢魔之時.png",
        },
        {
          href: "https://play.google.com/store/apps/details?id=com.LittleFox.LittleFox&hl=zh_TW",
          src: "/static/GooglePlay逢魔之時.png",
        },
        {
          href: "https://simmer.io/@louise_bws/littlefox",
          src: "/static/SimmerQRCode.png",
        },
      ],
    };
  },
};
</script>
