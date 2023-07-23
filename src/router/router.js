import { createRouter, createWebHistory } from "vue-router";
import Home from "./../views/Home.vue";
import Register from "./../views/Register.vue";
import Login from "./../views/Login.vue";
import ForgotPassword from "./../views/ForgotPassword.vue";
import VerificationResetPassword from "./../views/VerificationResetPassword.vue";
import ResetPassword from "./../components/ResetPasswordComp.vue";
import ExpiredToken from "./../components/ExpiredTokenComp.vue";
import Dashboard from "./../views/Dashboard.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import NotFound from "../views/NotFound.vue";
import NotFoundPages from "../views/NotFoundPages.vue";
import Service from "../views/Service.vue";
import Sales from "../views/Sales.vue";
import Webinar from "../views/Webinar.vue";

import { useStore } from "./../stores/store.js";
import axios from "axios";

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
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password | Todo App With Vue 3 and Mongodb",
    },
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard | Todo App With Vue 3 and Mongodb",
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
    path: "/not-found",
    name: "NotFoundPages",
    component: NotFoundPages,
  },

  {
    path: "/verification-reset-password/:token",
    name: "VerificationResetPassword",
    component: VerificationResetPassword,
    meta: {
      title: "Verifikasi | Todo App With Vue 3 and Mongodb",
    },
    children: [
      {
        path: "/verification-reset-password/:token/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        meta: {
          title: "Reset Password | Todo App With Vue 3 and Mongodb",
        },
      },
      {
        path: "/verification-reset-password/:token/expired-token",
        name: "ExpiredToken",
        component: ExpiredToken,
        meta: {
          title: "Expired Token | Todo App With Vue 3 and Mongodb",
        },
      },
    ],
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
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;

  const store = useStore();

  if (
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "Home" &&
    to.name !== "ForgotPassword" &&
    to.name !== "VerificationResetPassword" &&
    to.name !== "ResetPassword" &&
    to.name !== "ExpiredToken" &&
    to.name !== "NotFound" &&
    to.name !== "NotFoundPages" &&
    store.isUserLoggedIn === false
  ) {
    next({ name: "Login" });
  } else {
    next();
  }

  window.scrollTo(0, 0);
});

router.afterEach((to) => {
  // Mengubah judul head saat rute berubah
  document.title = to.meta.title || "Nama Default";
  // scroll to top
});

export default router;
