import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";

library.add(faBars, faMagnifyingGlass, faUser, faCartShopping);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
