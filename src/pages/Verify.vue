<template>
  <HeaderComponentVue />
  <SmallHeaderComponentVue pageTitle="驗證" />
  <div class="d-block justify-content-center align-items-center mt-5">
    <div
      class="d-flex justify-content-start align-items-center mt-5 fs-6 m-auto w-100 row"
    >
      <p class="col-12 text-center">
        您的驗證碼已透過 <span class="fw-bold">郵件</span> 發送至
      </p>
      <p class="col-12 text-center">xxx@gmail.com</p>
    </div>

    <div class="mt-5">
      <input class="w-100" type="text" placeholder="驗證碼" />
    </div>

    <div class="d-block justify-content-center align-items-center fs-6 mt-5">
      <div class="text-center">
        沒有收到驗證碼嗎？
        <a href="#" class="text-decoration-none">重寄</a>
      </div>
    </div>
    <!-- TODOError: 輸入錯誤時有一個popup顯示輸入錯誤 -->
    <!-- TODOError: Bar改為第二階段 -->
    <!-- TODOAdd: 輸入正確自動跳轉 -->
  </div>
</template>

<script>
import HeaderComponentVue from "../components/HeaderComponent.vue";
import SmallHeaderComponentVue from "../components/SmallHeaderComponent.vue";

export default {
  components: { HeaderComponentVue, SmallHeaderComponentVue },
};
</script>
