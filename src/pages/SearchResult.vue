<template>
  <HeaderComponent />
  <ElevatorComponent />

  <!-- 為了col-10所以在包一層 -->
  <div class="d-flex justify-content-center align-items-center mt-5">
    <div class="d-flex col-xl-10 col-12">
      <!-- 條件欄 -->
      <div class="p-3 col-lg-2 col-sm-3 col-4 shadow me-3">
        <div class="d-block mb-3">
          <h4>分類</h4>
          <div>
            <input type="checkbox" />
            <span class="ms-2">分類1</span>
          </div>
          <div>
            <input type="checkbox" />
            <span class="ms-2">分類2</span>
          </div>
        </div>
        <div class="mb-3">
          <h4>價格範圍</h4>
          <div class="d-flex justify-content-between">
            <input
              class="form-control form-control-sm text-center"
              style="height: 2rem"
              type="text"
              placeholder="最小值"
              value="0"
            />
            <div class="" style="height: 2rem">~</div>
            <input
              class="form-control form-control-sm text-center"
              style="height: 2rem"
              type="text"
              placeholder="最大值"
            />
          </div>
        </div>
        <div class="mb-3">
          <h4>評價</h4>
          <div>ooooo</div>
          <div>ooooo 或以上</div>
          <div>ooooo 或以上</div>
          <div>ooooo 或以上</div>
          <div>ooooo 或以上</div>
        </div>
        <div class="mb-3">
          <h4>保存狀況</h4>
          <div>
            <input type="checkbox" />
            <span class="ms-2">全新</span>
          </div>
          <div>
            <input type="checkbox" />
            <span class="ms-2">二手</span>
          </div>
        </div>
        <button class="btn btn-outline-primary w-100">清除全部</button>
      </div>

      <div class="w-100 shadow p-3">
        <!-- 商品數量 排序 -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>{{ this.GetFilterItems.length }} 件商品</div>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
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

        <!-- 商品列表 -->
        <div class="container p-0">
          <!-- justify-content-start 是為了物品在未滿一列時靠左而不是置中-->
          <div class="row d-flex justify-content-start align-items-center">
            <div
              v-for="item in this.GetFilterItems"
              :key="item.id"
              class="col-xl-3 col-md-4"
            >
              <ItemComponent :item="item" />
            </div>
          </div>
        </div>
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
