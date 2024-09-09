HeaderComponent.vue
<template>
  <!-- TODOError: 按下搜尋按鈕沒有彈出搜尋視窗 -->
  <header
    class="d-flex justify-content-between align-items-center p-2 border border-danger"
    style="height: 4rem"
  >
    <div class="d-flex justify-content-start align-items-center w-100">
      <button
        @click="ToggleSearchWindow()"
        class="border border-0 bg-transparent d-md-none"
      >
        <i class="fa-solid fa-magnifying-glass fs-5"></i>
      </button>
    </div>
  </header>
  <SearchWindowComponent :isOpen="isSearchWindowOpen" />
</template>

<script>
import SearchWindowComponent from "./SearchWindowComponent.vue";

export default {
  components: { SearchWindowComponent },
  data() {
    return {
      isSearchWindowOpen: false,
    };
  },
  methods: {
    ToggleSearchWindow() {
      this.isSearchWindowOpen = !this.isSearchWindowOpen;
    },
  },
};
</script>

SearchWindowComponent.vue
<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 position-fixed left-0 bg-white overflow-y-auto p-3 z-3"
    style="top: 4rem"
    v-if="isOpen"
  >
    <input type="text" class="form-control" placeholder="查詢" />
    <h1>搜尋</h1>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
