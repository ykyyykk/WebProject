<template>
  <HeaderComponent />

  <div id="itmesContainer" class="container">
    <div class="d-flex justify-content-between align-items-center">
      <div>{{ items.length }} 件商品</div>

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
        </ul>
      </div>
    </div>
    <div class="row d-flex justify-content-start align-items-center p-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="card col-lg-3 col-sm-4 col-6"
      >
        <ItemComponent :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import ItemComponent from "../components/ItemComponent.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return { sortTag: "" };
  },
  components: { HeaderComponent, ItemComponent },
  computed: {
    ...mapGetters(["getItems", "getSearchQuery"]),
    // 給v-for用的
    items() {
      return this.getItems.filter((item) =>
        item.name.toLowerCase().includes(this.getSearchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ChangeSortTag(sortTag) {
      this.sortTag = sortTag;
    },
  },
};
</script>
