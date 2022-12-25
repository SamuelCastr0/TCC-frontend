import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";

import Paginate from "vuejs-paginate-next";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vue3GoogleLogin from "vue3-google-login";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./icons";

const app = createApp(App);

app
  .use(router)
  .use(Toast)
  .use(Paginate)
  .use(vue3GoogleLogin, {
    clientId:
      "554950280911-oaku6c1d5ddh6ss0u2m16k8a7q7lnu2a.apps.googleusercontent.com",
  })
  .component("fa", FontAwesomeIcon);

app.mount("#app");
