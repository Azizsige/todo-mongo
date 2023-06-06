import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// router
import router from "./router/router";
// plugin
import("preline");
// import("flowbite");
// vueuse motion
import { MotionPlugin } from "@vueuse/motion";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
