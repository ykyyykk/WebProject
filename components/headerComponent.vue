<script></script>
<template>
  <header
    class="d-flex justify-content-between align-items-center border border-1 p-3"
    style="height: 4rem"
  >
    <div class="d-flex justify-content-start align-items-center w-100">
      <button class="border border-0 bg-transparent">
        <i class="fa-solid fa-bars fs-2"></i>
      </button>

      <a
        class="text-decoration-none ms-3"
        href="index.html"
        style="width: 12rem"
      >
        <img
          style="width: 100%; height: auto"
          class=""
          src="../img/Decathlon_Logo.png"
          href="index.html"
        />
      </a>
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

      <a class="bg-transparent text-black" href="">
        <img
          src="../img/customer-service.png"
          alt=""
          style="width: 1.3rem; height: 1.3rem"
        />
      </a>

      <!-- TODO: 視窗最小時隱藏 按下搜尋按鈕 覆蓋 -->
      <!-- <input type="text" class="form-control" placeholder="查詢" aria-label="search" aria-describedby="addon-wrapping"/> -->
      <!-- 判斷會員是否登入 -->
      <a class="bg-transparent text-black" href="member_center.html">
        <i class="fa-solid fa-user"></i>
      </a>

      <a class="bg-transparent text-black ms-auto me-2" href="cart.html">
        <i class="fa-solid fa-cart-shopping"></i>
      </a>
    </div>
  </header>
</template>
<style></style>
