<template>
  <!-- TODOWarning: 需要先解決 itemMangement 有scroll 而且footer看的到在同一個高度內 -->
  <!-- position-absolute -->
  <!-- style="top: 6.2rem" -->
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <router-link
      class="btn btn-outline-primary mb-3 mx-2"
      :to="{ name: 'ItemManagement' }"
    >
      產品管理
    </router-link>

    <router-link
      class="btn btn-outline-primary mb-3 mx-2"
      :to="{ name: 'UserManagement' }"
    >
      用戶管理
    </router-link>

    <router-link
      class="btn btn-outline-primary mb-3 mx-2"
      :to="{ name: 'RevenueChart' }"
    >
      營收圖表
    </router-link>

    <button
      class="btn btn-outline-primary mb-3 mx-2"
      @click="CleanExpiresVerification()"
    >
      清理驗證碼
    </button>
  </div>

  <div class="mb-3 position-absolute z-3" style="top: 7rem; left: 0.5rem">
    <button
      class="btn btn-outline-primary overflow-auto"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasScrolling"
      aria-controls="offcanvasScrolling"
    >
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Offcanvas } from "bootstrap";

export default {
  mounted() {
    // TODO 為了讓SideBar一開始就是打開的狀態 暫時關閉 等到不被擋住時再打開
    // const offcanvasElement = document.getElementById("offcanvasScrolling");
    // const bsOffcanvas = new Offcanvas(offcanvasElement);
    // bsOffcanvas.show(); // 通過JavaScript 打開Sidebar
  },
  methods: {
    async CleanExpiresVerification() {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/deleteexpiresverification`
        );

        if (response.data.data.affectedRows <= 0) {
          alert("沒有驗證碼需要清除");
          return;
        }
        if (response.data.success) {
          console.log(`response.data: ${JSON.stringify(response.data)}`);
          alert("清除成功");
        }
      } catch (error) {
        alert(`error: ${error}`);
      }
    },
  },
};
</script>
