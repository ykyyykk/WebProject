<template>
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

  <div
    class="border border-black offcanvas offcanvas-start"
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
        aria-label="Close"
        data-bs-dismiss="offcanvas"
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
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default {
  mounted() {
    //需要import 但是會讓AddItem.vue的Dropdown 沒辦法出現下拉式選單
    // import { Offcanvas } from "bootstrap";
    // 為了讓SideBar一開始就是打開的狀態 暫時關閉 等到不被擋住時再打開
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
