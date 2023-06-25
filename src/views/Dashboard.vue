<template>
  <nav
    class="fixed top-0 z-50 w-full border-b border-gray-200 bg-secondaryColor dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <router-link to="/" class="flex ml-2 md:mr-24">
            <img
              src="/img/icon-dashboard.png"
              class="h-8 mr-3"
              alt="FlowBite Logo"
            />
            <span
              class="self-center text-xl text-white font-Rowdies sm:text-2xl whitespace-nowrap"
              >Todo Daily</span
            >
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
            </div>
            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p
                  class="text-sm font-bold text-gray-900 lg:text-lg dark:text-white"
                  role="none"
                >
                  {{ store.userNameStore }}
                </p>
                <p
                  class="text-sm font-medium text-gray-900 truncate lg:text-md dark:text-gray-300"
                  role="none"
                >
                  {{ store.userEmailStore }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Today</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    @click="logout"
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <Sidebars />

  <div class="p-4 sm:ml-64 font-Roboto">
    <div class="p-4 mt-14">
      <TodoItems />
    </div>
  </div>
</template>

<script setup>
import Sidebars from "./../components/Sidebars.vue";
import TodoItems from "./../components/TodoItems.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "./../stores/store.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
const getCookie = cookies.get("accessToken");
import axios from "axios";

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
  await cookies.remove("accessToken");

  store.isUserLoggedIn = false;
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

  getExpired();
});
// import { onMounted } from "vue";
// import { initFlowbite } from "flowbite";

// // initialize components based on data attribute selectors
// onMounted(() => {
//   initFlowbite();
// });
</script>

<style lang="css" scoped></style>
