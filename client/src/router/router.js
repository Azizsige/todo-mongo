import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
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
  const menuItems = ["Home", "Service", "Sales", "Webinar", "About", "Contact"];
  if (!menuItems.includes(to.name)) {
    next({ name: "NotFound" });
  }
  next();
});

export default router;
