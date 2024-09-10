<template>
  <input
    v-model="searchQuery"
    @input="OnInput()"
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
import { mapGetters } from "vuex/dist/vuex.cjs.js";

export default {
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
      filterItems: [],
    };
  },
  computed: {
    ...mapGetters(["getItems"]),
  },
  methods: {
    OnInput() {
      // 中文要等Enter才會有結果
      // input字串字數
      if (this.searchQuery.length > 0) {
        this.filterItems = this.getItems.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.showDropdown = this.filterItems.length > 0;
      } else {
        this.showDropdown = false;
      }
    },
    SelectSearchItem(item) {
      this.searchQuery = item.name;
      this.showDropdown = false;
      // console.log(`SelectItem: ${item}`);
    },
    HandleClickOutside(event) {
      const searchComponent = this.$el;
      if (!searchComponent.contains(event.target)) {
        this.showDropdown = false;
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
