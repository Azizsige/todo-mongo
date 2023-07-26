<template>
  <DashboardNavbar />
  <Sidebars />
  <TodoItems />
</template>

<script setup>
import DashboardNavbar from "./../components/DashboardNavbar.vue";
import Sidebars from "./../components/Sidebars.vue";
import TodoItems from "./../components/TodoItems.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "./../stores/store.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const getCookie = cookies.get("accessToken");
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const store = useStore();

const getExpired = () => {
  const date = new Date();

  // Menambahkan 12 jam ke waktu
  date.setHours(date.getHours() + 24);

  // Mendapatkan tanggal, bulan, tahun, dan waktu dalam waktu lokal
  const day = date.getDate();
  const month = date.getMonth() + 1; // Bulan dimulai dari 0, sehingga ditambah 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let Twelvehours = date.getHours() + 12;
  let TwelveHoursLaterDay = day;
  let TwelveHoursLaterMonth = month;

  let OneDay = hours + 24;
  let OneDayLaterDay = day;
  let OneDayLaterMonth = month;

  if (Twelvehours >= 24) {
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    Twelvehours = Twelvehours % 24;
    TwelveHoursLaterDay = tomorrow.getDate();
    TwelveHoursLaterMonth = tomorrow.getMonth() + 1;
  }

  if (OneDay >= 24) {
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    OneDay = OneDay % 24;
    OneDayLaterDay = tomorrow.getDate();
    OneDayLaterMonth = tomorrow.getMonth() + 1;
  }

  // Membentuk string waktu dalam format yang diinginkan
  const formattedToday = `${day}/${month}/${year} - ${hours}:${minutes}`;
  const TwelveHoursLater = `${TwelveHoursLaterDay}/${TwelveHoursLaterMonth}/${year} - ${Twelvehours}:${minutes}`;
  const OneDayLater = `${OneDayLaterDay}/${OneDayLaterMonth}/${year} - ${OneDay}:${minutes}`;

  store.expiredAccessToken = formattedToday;
  store.expiredRefreshToken = OneDayLater;

  console.log(formattedToday);
  console.log(TwelveHoursLater);
  console.log(OneDayLater);

  if (
    formattedToday == TwelveHoursLater ||
    formattedToday >= TwelveHoursLater
  ) {
    console.log("Token Expired");
    store.isUserLoggedIn = false;
    router.push("/login");
  } else if (formattedToday == OneDayLater || formattedToday >= OneDayLater) {
    console.log("Token Expired");
    store.isUserLoggedIn = false;
    router.push("/login");
  }
};

const logout = async () => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  const params = new URLSearchParams();
  params.append("userId", store.userIdStore);
  params.append("accessToken", store.accessToken);

  try {
    const response = await axios.post(
      `https://todo-mongo-api-one.vercel.app/api/auth/logout`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${store.accessToken}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: `Logout Berhasil`,
    });

    store.isUserLoggedIn = false;
    router.push("/login");
  } catch (err) {
    console.log(err.response.data);
  }
};

onMounted(async () => {
  if (store.isUserLoggedIn == true) {
    router.push("/dashboard");
    await store.getData();
    console.log("Token Valid");
  } else {
    router.push("/login");
    console.log("Token Invalid");
  }

  // getExpired();
});
// import { onMounted } from "vue";
// import { initFlowbite } from "flowbite";

// // initialize components based on data attribute selectors
// onMounted(() => {
//   initFlowbite();
// });
</script>

<style lang="css" scoped></style>
