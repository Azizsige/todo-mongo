<template>
  <DashboardNavbar />
  <Sidebars />

  <div class="p-4 sm:ml-64 font-Roboto">
    <div class="p-4 mt-14">
      <form id="login">
        <div class="bg-white dark:bg-gray-800">
          <div class="container mx-auto bg-white dark:bg-gray-800 rounded">
            <div
              class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800"
            >
              <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Profile
                </p>
                <div
                  class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      class="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="profiles-wrapper flex flex-col lg:flex-row lg:space-x-5"
            >
              <div class="mx-auto w-full lg:w-1/2 text-center">
                <div class="xl:w-9/12 w-full mx-auto xl:mx-0">
                  <div
                    class="rounded relative mt-24 lg:mt-48 h-[3rem] mx-auto flex justify-center"
                  >
                    <div
                      class="w-[10rem] h-[10rem] lg:w-[15rem] lg:h-[15rem] rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 mx-auto text-center shadow flex items-center justify-center"
                    >
                      <img
                        src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                        alt=""
                        class="absolute z-0 h-full w-[15rem] object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                      />
                      <div
                        class="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0"
                      ></div>
                      <div
                        class="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-edit"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path
                            d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                          />
                          <path
                            d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
                          />
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                        <p class="text-xs text-gray-100">Edit Picture</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-full mx-auto bg-white dark:bg-gray-800 mt-8 lg:mt-0 rounded px-4"
              >
                <div class="mx-auto pt-4">
                  <div class="container mx-auto">
                    <form class="my-6 w-full mx-auto xl:w-full xl:mx-0">
                      <div class="xl:w-full md:w-full flex flex-col mb-6">
                        <label
                          for="fullName"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Full Name</label
                        >
                        <input
                          tabindex="0"
                          type="text"
                          id="FirstName"
                          name="firstName"
                          disabled
                          class="border border-gray-300 bg-slate-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm placeholder:font-bold focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-600 dark:text-gray-400"
                          :placeholder="store.userFullNameStore"
                        />
                      </div>
                      <div class="xl:w-full md:w-full flex flex-col mb-6">
                        <label
                          for="username"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Username</label
                        >
                        <input
                          tabindex="0"
                          type="text"
                          id="username"
                          name="username"
                          disabled
                          class="border border-gray-300 bg-slate-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder:font-bold placeholder-gray-500 text-gray-600 dark:text-gray-400"
                          :placeholder="`@ ${store.userNameStore}`"
                        />
                      </div>
                      <div class="xl:w-full md:w-full flex flex-col mb-6">
                        <label
                          for="Email"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Email</label
                        >
                        <div
                          class="border border-gray-300 shadow-sm rounded flex"
                        >
                          <div
                            tabindex="0"
                            class="focus:outline-none hidden lg:block px-4 border border-gray-300 bg-slate-300 border-r-0 py-3 dark:text-gray-100 items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-mail"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <polyline points="3 7 12 13 21 7" />
                            </svg>
                          </div>
                          <input
                            tabindex="0"
                            type="text"
                            id="Email"
                            name="email"
                            disabled
                            class="py-3 pl-3 lg:pl-3 lg:py-3 w-full text-sm border border-gray-300 border-l-0 focus:outline-none placeholder-gray-500 placeholder:font-bold bg-transparent text-gray-600 dark:text-gray-400 bg-slate-300"
                            :placeholder="store.userEmailStore"
                          />
                        </div>
                      </div>

                      <div class="xl:w-full md:w-full flex flex-col mb-6">
                        <label
                          for="jenisKelamin"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Jenis Kelamin</label
                        >
                        <input
                          tabindex="0"
                          type="text"
                          id="jenisKelamin"
                          name="jenisKelamin"
                          disabled
                          class="border bg-transparent bg-slate-300 border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder:font-bold"
                          :placeholder="store.userJenisKelamin"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Code block ends -->
</template>

<script setup>
import DashboardNavbar from "./../components/DashboardNavbar.vue";
import Sidebars from "./../components/Sidebars.vue";
import { useStore } from "./../stores/store.js";

const store = useStore();
</script>

<style lang="scss" scoped></style>
