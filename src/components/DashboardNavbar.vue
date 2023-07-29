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
                  v-if="store.userJenisKelamin == 'Laki-laki'"
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />

                <img
                  v-else
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
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
                  <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Settings</router-link
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
</template>

<script setup>
import { useStore } from "./../stores/store.js";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

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

    store.$reset();
    router.push("/login");
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
