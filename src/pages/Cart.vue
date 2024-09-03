<template>
  <body
    class="d-block justify-content-start align-items-center vh-100 overflow-x-hidden"
  >
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
            src="../assets/img/Decathlon_Logo.png"
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
            src="../assets/img/customer-service.png"
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

    <div class="p-3">
      <a class="text-decoration-none text-black" href="index.html">
        <i class="fa-solid fa-arrow-left"></i>繼續購物
      </a>
    </div>

    <div id="itmesContainer" class="container">
      <div class="row d-flex justify-content-start align-items-center g-2">
        <div class="d-flex p-2 rounded border border-black">
          <input class="ms-3 me-3" type="checkbox" />
          <img
            src="../assets/img/slide1.png"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
          <div class="d-block align-items-center">
            <div class="mb-2">商品名稱</div>
            <div class="mb-2">$10</div>
            <div class="input-group mb-3 w-50">
              <button class="input-group-text btn btn-outline-secondary">
                -
              </button>
              <input
                type="number"
                class="form-control text-center border border-secondary"
                placeholder="數量"
                value="1"
                min="1"
              />
              <button class="input-group-text btn btn-outline-primary">
                +
              </button>

              <button class="input-group-text btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex p-2 rounded border border-black">
          <input class="ms-3 me-3" type="checkbox" />
          <img
            src="../assets/img/slide1.png"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
          <div class="d-block align-items-center">
            <div class="mb-2">商品名稱</div>
            <div class="mb-2">$10</div>
            <div class="input-group mb-3 w-50">
              <button class="input-group-text btn btn-outline-secondary">
                -
              </button>
              <input
                type="number"
                class="form-control text-center border border-secondary"
                placeholder="數量"
                value="1"
              />
              <button class="input-group-text btn btn-outline-primary">
                +
              </button>

              <button class="input-group-text btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex p-2 rounded border border-black">
          <input class="ms-3 me-3" type="checkbox" />
          <img
            src="../assets/img/slide1.png"
            class="me-3"
            style="width: 7rem; height: 7rem"
            alt="商品圖片"
          />
          <div class="d-block align-items-center">
            <div class="mb-2">商品名稱</div>
            <div class="mb-2">$10</div>
            <div class="input-group mb-3 w-50">
              <button class="input-group-text btn btn-outline-secondary">
                -
              </button>
              <input
                type="number"
                class="form-control text-center border border-secondary"
                placeholder="數量"
                value="1"
              />
              <button class="input-group-text btn btn-outline-primary">
                +
              </button>

              <button class="input-group-text btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
