import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AddItem from "../pages/AddItem.vue";
import Cart from "../pages/Cart.vue";
import MemberCenter from "../pages/MemberCenter.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import NotFound from "../pages/NotFound.vue";
import ItemDetail from "../pages/ItemDetail.vue";
import SearchResult from "../pages/SearchResult.vue";
import Dashboard from "../pages/Dashboard.vue";
import ItemManagement from "../pages/ItemManagement.vue";
import UserManagement from "../pages/UserManagement.vue";
import RevenueChart from "../pages/RevenueChart.vue";
import MiniGame from "../pages/MiniGame.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/minigame",
    name: "MiniGame",
    component: MiniGame,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
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
    path: "/itemdetail/:id",
    name: "ItemDetail",
    component: ItemDetail,
  },
  {
    path: "/searchresult",
    name: "SearchResult",
    component: SearchResult,
  },
  {
    path: "/addItem",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "", // 空路徑表示default
        name: "ItemManagement",
        component: ItemManagement,
      },
      {
        path: "/dashboard/usermanagement",
        name: "UserManagement",
        component: UserManagement,
      },
      {
        path: "/dashboard/revenuechart",
        name: "RevenueChart",
        component: RevenueChart,
      },
    ],
  },
  {
    // 404轉址
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

// console.log(import.meta.env.BASE_URL); // 輸出是: /
// console.log(import.meta.env.VITE_API_BASE_URL); // localhost:3000
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
