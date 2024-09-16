<template>
  <HeaderComponent />
  <ElevatorComponent />

  <div id="itmesContainer" class="container mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <div>{{ this.GetFilterItems.length }} 件商品</div>

      <div class="btn-group">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          排序 {{ sortTag }}
        </button>
        <ul class="dropdown-menu">
          <li>
            <a @click="ChangeSortTag('價格: 低至高')" class="dropdown-item"
              >價格: 低至高</a
            >
          </li>
          <li>
            <a @click="ChangeSortTag('價格: 高至低')" class="dropdown-item"
              >價格: 高至低</a
            >
          </li>
          <li>
            <a @click="ChangeSortTag('銷量: 低至高')" class="dropdown-item"
              >銷量: 低至高</a
            >
          </li>
          <li>
            <a @click="ChangeSortTag('銷量: 高至低')" class="dropdown-item"
              >銷量: 高至低</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row d-flex justify-content-start align-items-center p-3">
      <div
        v-for="item in this.GetFilterItems"
        :key="item.id"
        class="col-lg-3 col-sm-4 col-6"
      >
        <ItemComponent :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex/dist/vuex.cjs.js";
import HeaderComponent from "../components/HeaderComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import ElevatorComponent from "../components/ElevatorComponent.vue";

export default {
  data() {
    return {
      sortTag: "",
    };
  },
  components: { HeaderComponent, ItemComponent, ElevatorComponent },
  computed: {
    ...mapState(["items,searchQuery"]),
    // 給v-for用的
    GetFilterItems() {
      let filterItems = this.$store.state.items.filter((item) =>
        item.name
          .toLowerCase()
          .includes(this.$store.state.searchQuery.toLowerCase())
      );
      switch (this.sortTag) {
        case "價格: 低至高":
          return filterItems.sort(function (a, b) {
            return a.price - b.price;
          });
        case "價格: 高至低":
          return filterItems.sort(function (a, b) {
            return b.price - a.price;
          });
        case "銷量: 低至高":
          return filterItems.sort(function (a, b) {
            return a.saleAmount - b.saleAmount;
          });
        case "銷量: 高至低":
          return filterItems.sort(function (a, b) {
            return b.saleAmount - a.saleAmount;
          });
      }
      return filterItems;
    },
  },
  methods: {
    ChangeSortTag(sortTag) {
      this.sortTag = sortTag;
    },
  },
};
</script>
