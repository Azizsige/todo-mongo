import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// router
import router from "./router/router";
// pinia and pinia plugin persistedstate
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// plugin
import("preline");

// vueuse motion
import { MotionPlugin } from "@vueuse/motion";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// import vue sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);

// Vue Auto Animate
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(Toast, {
    newestOnTop: false,
    timeout: 3000,
    maxToasts: 6,
  })
  .use(VueSweetalert2)
  .use(pinia)
  .use(autoAnimatePlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
