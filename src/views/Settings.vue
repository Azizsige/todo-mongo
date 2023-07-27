<template>
  <DashboardNavbar />
  <Sidebars />

  <div class="p-4 sm:ml-64 font-Roboto">
    <div class="p-4 mt-14">
      <form id="login">
        <div class="bg-white dark:bg-gray-800">
          <div class="container mx-auto bg-white rounded dark:bg-gray-800">
            <div
              class="py-5 bg-white border-b border-gray-300 xl:w-full dark:border-gray-700 dark:bg-gray-800"
            >
              <div class="flex items-center w-11/12 mx-auto xl:w-full xl:mx-0">
                <p class="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Profile
                </p>
                <div
                  class="ml-2 font-bold text-gray-600 cursor-pointer dark:text-gray-400"
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
              class="flex flex-col profiles-wrapper lg:flex-row lg:space-x-5"
            >
              <div class="w-full mx-auto text-center lg:w-1/2">
                <div class="w-full mx-auto xl:w-9/12 xl:mx-0">
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
                        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black rounded-full opacity-50"
                      ></div>
                      <div
                        class="z-10 flex flex-col items-center justify-center text-gray-100 cursor-pointer"
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
                class="w-full px-4 mx-auto mt-8 bg-white rounded dark:bg-gray-800 lg:mt-0"
              >
                <div class="pt-4 mx-auto">
                  <div class="container mx-auto">
                    <form class="w-full mx-auto my-6 xl:w-full xl:mx-0">
                      <div class="flex flex-col mb-6 xl:w-full md:w-full">
                        <label
                          for="fullName"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Full Name</label
                        >
                        <input
                          tabindex="0"
                          type="text"
                          id="FirstName"
                          v-model="fullName"
                          name="firstName"
                          :class="{
                            'bg-transparent border border-secondaryColor':
                              !isDisabled,
                          }"
                          :disabled="isDisabled"
                          class="py-3 pl-3 text-sm font-bold text-gray-600 placeholder-gray-500 border border-gray-300 rounded shadow-sm bg-slate-300 dark:border-gray-700 placeholder:font-bold focus:outline-none focus:border-indigo-700 dark:text-gray-400"
                        />
                      </div>
                      <div class="flex flex-col mb-6 xl:w-full md:w-full">
                        <label
                          for="username"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Username</label
                        >
                        <input
                          tabindex="0"
                          type="text"
                          v-model="username"
                          id="username"
                          name="username"
                          :class="{
                            'bg-transparent border border-secondaryColor':
                              !isDisabled,
                          }"
                          :disabled="isDisabled"
                          class="py-3 pl-3 text-sm font-bold text-gray-600 border border-gray-300 rounded shadow-sm bg-slate-300 dark:border-gray-700 focus:outline-none focus:border-indigo-700 placeholder:font-bold 0 dark:text-gray-400"
                        />
                      </div>
                      <div class="flex flex-col mb-6 xl:w-full md:w-full">
                        <label
                          for="Email"
                          class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                          >Email</label
                        >
                        <div
                          class="flex border border-gray-300 rounded shadow-sm"
                        >
                          <div
                            tabindex="0"
                            class="items-center hidden px-4 py-3 border border-r-0 border-gray-300 md:block focus:outline-none bg-slate-300 dark:text-gray-100"
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
                            v-model="email"
                            name="email"
                            :class="{
                              'bg-transparent border border-secondaryColor':
                                !isDisabled,
                            }"
                            :disabled="isDisabled"
                            class="w-full py-3 pl-3 text-sm font-bold text-gray-600 placeholder-gray-500 border border-l-0 border-gray-300 lg:pl-3 lg:py-3 focus:outline-none placeholder:font-bold dark:text-gray-400 bg-slate-300"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col mb-6 xl:w-full md:w-full">
                        <label
                          for="jenisKelamin"
                          class="block mb-2 text-lg font-bold text-black dark:text-white"
                          >Jenis Kelamin :
                        </label>
                        <select
                          v-model="jenisKelamin"
                          :class="{
                            'bg-transparent border border-secondaryColor':
                              !isDisabled,
                          }"
                          :disabled="isDisabled"
                          id="jenisKelamin"
                          class="border bg-slate-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-edit">
              <div v-if="showSaveProfile" class="flex justify-end">
                <button
                  type="button"
                  @click.prevent="
                    showSaveProfile = !showSaveProfile;
                    isDisabled = !isDisabled;
                  "
                  class="px-4 py-2 ml-2 text-white border rounded-lg bg-secondaryColor hover:bg-white hover:text-secondaryColor hover:border-secondaryColor"
                >
                  Edit Profile
                </button>
              </div>
              <div v-else class="flex justify-end">
                <button
                  type="button"
                  @click.prevent="
                    showSaveProfile = !showSaveProfile;
                    isDisabled = !isDisabled;
                  "
                  class="px-4 py-2 border rounded-lg border-secondaryColor text-secondaryColor hover:bg-secondaryColor hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  @click.prevent="editProfile"
                  class="px-4 py-2 ml-2 text-white border rounded-lg bg-secondaryColor hover:bg-white hover:text-secondaryColor hover:border-secondaryColor"
                >
                  Save New Profile
                </button>
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
import { useProfilesStore } from "./../stores/profiles.js";
import { ref } from "vue";

const store = useStore();
const profilesStore = useProfilesStore();
const isDisabled = ref(true);
const showSaveProfile = ref(true);

const fullName = ref(store.userFullNameStore);
const username = ref(store.userNameStore);
const email = ref(store.userEmailStore);
const jenisKelamin = ref(store.userJenisKelamin);

const editProfile = () => {
  profilesStore.updateProfile(
    store.userIdStore,
    fullName.value,
    username.value,
    email.value,
    jenisKelamin.value
  );
  profilesStore.test();
  showSaveProfile.value = !showSaveProfile.value;
  isDisabled.value = !isDisabled.value;
};
</script>

<style lang="scss" scoped></style>
