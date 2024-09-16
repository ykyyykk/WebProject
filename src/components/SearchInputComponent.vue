<template>
  <input
    v-model="searchQuery"
    @input="OnInput()"
    v-on:keyup.enter="this.ToggleSearchWindow()"
    type="text"
    class="form-control"
    placeholder="查詢"
  />
  <div class="position-relative">
    <!-- z-1為了蓋住Swiper -->
    <ul v-if="showDropdown" class="list-group position-absolute w-100 z-1">
      <li
        v-for="item in filterItems"
        :key="item.id"
        @click="SelectSearchItem(item)"
        class="list-group-item"
      >
        <!-- TODOWarning: 這裡會Warning 跟中文無關 數字也會 只有在找到東西才會觸發 search 改 aaa 沒用  -->
        <router-link
          :to="{ name: 'SearchResult', params: { search: this.searchQuery } }"
          class="stretched-link text-decoration-none text-black"
          >{{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex/dist/vuex.cjs.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      filterItems: [],
    };
  },
  computed: {
    ...mapState(["items"]),
  },
  methods: {
    ...mapActions(["SetSearchQuery"]),
    OnInput() {
      // 中文要等Enter才會有結果
      // input字串字數
      // 為了搜尋後 能刪掉關鍵字 看到所有物品
      this.filterItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.SetSearchQuery({ searchQuery: this.searchQuery });
      this.showDropdown = this.searchQuery.length > 0;
    },
    SelectSearchItem(item) {
      this.searchQuery = item.name;
      this.showDropdown = false;
      this.SetSearchQuery({ searchQuery: this.searchQuery });
    },
    HandleClickOutside(event) {
      const searchComponent = this.$el;
      if (!searchComponent.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    ToggleSearchWindow() {
      this.showDropdown = false;
      this.$emit("ToggleSearchWindow");
      // 檢查當前路由是否已經是SearchResult
      if (this.$route.name !== "SearchResult") {
        this.$router.push({ name: "SearchResult" });
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.HandleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.HandleClickOutside);
  },
};
</script>
