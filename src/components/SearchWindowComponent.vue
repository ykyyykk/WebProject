<template>
  <!-- 用bootstrap的opacity去調整 會影響子div -->
  <div
    class="w-100 h-100 position-absolute left-0 bg-white p-3 z-3"
    style="top: 4rem"
    v-if="isOpen"
  >
    <div class="position-relative">
      <input
        v-model="searchQuery"
        @input="SearchItems()"
        type="text"
        class="form-control"
        placeholder="查詢"
      />
      <ul v-if="showDropdown" class="list-group position-absolute w-100">
        <li
          v-for="item in filterItems"
          :key="item.id"
          @click="SelectItem(item)"
          class="list-group-item"
        >
          <router-link class="stretched-link text-decoration-none text-black">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </div>
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
    SearchItems() {
      // 中文要等Enter才會有結果
      // console.log(this.searchQuery);
      // console.log(this.getItems.length);
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
    SelectItem(item) {
      this.searchQuery = item.name;
      this.showDropdown = false;
      console.log(`SelectItem: ${item}`);
    },
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
        this.searchQuery = "";
        this.showDropdown = false;
      }
    },
  },
};
</script>
