import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import Register from "./../views/Register.vue";
import Login from "./../views/Login.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import NotFound from "../views/NotFound.vue";
import Service from "../views/Service.vue";
import Sales from "../views/Sales.vue";
import Webinar from "../views/Webinar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home | Todo App With Vue 3 and Mongodb",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register | Todo App With Vue 3 and Mongodb",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login | Todo App With Vue 3 and Mongodb",
    },
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/webinar",
    name: "Webinar",
    component: Webinar,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact-us",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// if not found redirect to 404
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const menuItems = [
    "Home",
    "Service",
    "Sales",
    "Webinar",
    "About",
    "Contact",
    "Register",
    "Login",
  ];
  if (!menuItems.includes(to.name)) {
    next({ name: "NotFound" });
  }
  next();
});

router.afterEach((to) => {
  // Mengubah judul head saat rute berubah
  document.title = to.meta.title || "Nama Default";
});

export default router;
