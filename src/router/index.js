import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Cart from "../pages/Cart.vue";
import Item from "../pages/Items/Item.vue";
import ItemDetail from "../pages/Items/ItemDetail.vue";
import NotFound from "../pages/NotFound.vue";
// import Jobs from "../pages/jobs/Jobs.vue";
// import JobDetails from "../pages/jobs/JobDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/item",
    name: "Item",
    component: Item,
  },
  {
    path: "/itemdetail/:id:title:detail",
    name: "ItemDetail",
    component: ItemDetail,
  },
  {
    // 404轉址
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  // 需要再vite.config.js.defineConfig()裡面新增base: "/",
  // 並在這邊把將process改成import.meta
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
