<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from "flowbite";
const props = defineProps({
  sidebars: Array,
});

onMounted(() => {
  onMounted(async () => {
    await initFlowbite();
    await initAccordions();
    await initCarousels();
    await initCollapses();
    await initDials();
    await initDismisses();
    await initDrawers();
    await initDropdowns();
    await initModals();
    await initPopovers();
    await initTabs();
    await initTooltips();

    // console.log(todoItems.value);
  });
});
</script>

<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#F9F9F9] sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-[#F9F9F9] dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in props.sidebars" :key="item.id">
          <router-link
            :to="item.link"
            href="#"
            class="flex items-center p-2 rounded-lg text-secondaryColor hover:bg-gray-100"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="item.pathD" fill="#FF4F5A" />
            </svg>

            <span class="ml-3">{{ item.name }}</span>
          </router-link>
        </li>
        <!-- <li>
          <a
            href="#"
            class="flex items-center p-2 rounded-lg text-secondaryColor hover:bg-gray-100"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.1875 7.25001C27.1875 6.2886 26.8056 5.36657 26.1258 4.68675C25.4459 4.00693 24.5239 3.62501 23.5625 3.62501H22.6562V2.74425C22.6562 2.25657 22.2813 1.838 21.7936 1.81364C21.6711 1.80774 21.5486 1.82677 21.4337 1.86959C21.3187 1.91242 21.2136 1.97813 21.1248 2.06276C21.036 2.14739 20.9653 2.24916 20.917 2.36193C20.8687 2.47469 20.8438 2.59608 20.8438 2.71876V3.62501H8.15625V2.74425C8.15625 2.25657 7.78129 1.838 7.29361 1.81364C7.17108 1.80774 7.04862 1.82677 6.93366 1.86959C6.8187 1.91242 6.71364 1.97813 6.62482 2.06276C6.53601 2.14739 6.46531 2.24916 6.41699 2.36193C6.36868 2.47469 6.34376 2.59608 6.34375 2.71876V3.62501H5.4375C4.47609 3.62501 3.55406 4.00693 2.87424 4.68675C2.19442 5.36657 1.8125 6.2886 1.8125 7.25001V7.9297C1.8125 7.98978 1.83637 8.04741 1.87886 8.0899C1.92135 8.13239 1.97897 8.15626 2.03906 8.15626H26.9609C27.021 8.15626 27.0787 8.13239 27.1211 8.0899C27.1636 8.04741 27.1875 7.98978 27.1875 7.9297V7.25001ZM1.8125 23.5625C1.8125 24.5239 2.19442 25.4459 2.87424 26.1258C3.55406 26.8056 4.47609 27.1875 5.4375 27.1875H23.5625C24.5239 27.1875 25.4459 26.8056 26.1258 26.1258C26.8056 25.4459 27.1875 24.5239 27.1875 23.5625V10.1953C27.1875 10.1352 27.1636 10.0776 27.1211 10.0351C27.0787 9.99263 27.021 9.96876 26.9609 9.96876H2.03906C1.97897 9.96876 1.92135 9.99263 1.87886 10.0351C1.83637 10.0776 1.8125 10.1352 1.8125 10.1953V23.5625Z"
                fill="#FF4F5A"
              />
            </svg>

            <span class="ml-3">Today</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
            <span
              class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
              >Pro</span
            >
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
              ></path>
              <path
                d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >3</span
            >
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
          </a>
        </li> -->
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
