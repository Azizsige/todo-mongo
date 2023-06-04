import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// router
import router from "./router/router";
// plugin
import("preline");
// vueuse motion
import { MotionPlugin } from "@vueuse/motion";

createApp(App).use(router).use(MotionPlugin).mount("#app");
