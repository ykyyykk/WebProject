<template>
  <!-- TODOWarning: 會隨著寬度等比例縮放 -->
  <!-- TODOError: 按下搜尋按鈕沒有彈出搜尋視窗 -->
  <header
    class="d-flex justify-content-between align-items-center p-2"
    style="height: 4rem"
  >
    <div class="d-flex justify-content-start align-items-center w-100">
      <button class="border border-0 bg-transparent">
        <i class="fa-solid fa-bars fs-2"></i>
      </button>

      <router-link
        :to="{ name: 'Home' }"
        class="text-decoration-none ms-3"
        style="width: 12rem"
      >
        <img
          style="width: 100%; height: auto"
          src="../assets/img/Decathlon_Logo.png"
        />
      </router-link>
      <input
        type="text"
        class="form-control ms-3 d-none d-md-block w-50"
        placeholder="查詢"
      />
    </div>

    <div class="d-flex justify-content-end align-items-center gap-2">
      <button class="border border-0 bg-transparent d-md-none">
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

      <!-- TODO: 視窗最小時隱藏 按下搜尋按鈕 覆蓋 -->
      <!-- <input type="text" class="form-control" placeholder="查詢" aria-label="search" aria-describedby="addon-wrapping"/> -->
      <!-- 判斷會員是否登入 -->

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
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    CheckLoginStatus() {
      return this.isLogin ? { name: "MemberCenter" } : { name: "Login" };
    },
  },
};
</script>
