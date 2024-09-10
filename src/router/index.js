import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AddItem from "../pages/AddItem.vue";
import Cart from "../pages/Cart.vue";
import Service from "../pages/Service.vue";
import MemberCenter from "../pages/MemberCenter.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import NotFound from "../pages/NotFound.vue";
import ItemDetail from "../pages/ItemDetail.vue";
import SearchResult from "../pages/SearchResult.vue";
import Grid from "../pages/Grid.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addItem",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/membercenter",
    name: "MemberCenter",
    component: MemberCenter,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/grid",
    name: "Grid",
    component: Grid,
  },
  {
    path: "/itemdetail/:id",
    name: "ItemDetail",
    component: ItemDetail,
  },
  // {
  //   path: "/searchresult",
  //   name: "SearchResult",
  //   component: SearchResult,
  //   props: (route) => ({ searchQuery: route.query.search }),
  // },
  // {
  //   path: "/searchresult/:search",
  //   name: "SearchResult",
  //   component: SearchResult,
  // },
  //實際在運作只有這個 但是是抓全部的item
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult,
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
