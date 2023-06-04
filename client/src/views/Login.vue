<template>
  <div class="wrapper bg-thirdColor">
    <div
      class="flex items-center justify-center h-screen mx-auto wrapper-container"
    >
      <div
        class="container-card bg-white shadow-lg w-[90%] lg:w-[512px] p-4 lg:p-7"
      >
        <div
          class="flex items-center card-header text-[36px] text-secondaryColor font-light space-x-2 font-Rowdies"
        >
          <img src="/img/icon.png" alt="" srcset="" />
          <p>Todo Daily</p>
        </div>
        <div class="mt-5 card-form">
          <div class="mb-5 form__header">
            <p class="text-[24px] font-Rowdies">Login</p>
          </div>

          <form>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Email :
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Password :
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  id="password"
                  class="block w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondaryColor focus:border-secondaryColor"
                  placeholder="Password"
                  required
                />
                <button
                  @click="togglePassword"
                  type="button"
                  class="text-white absolute right-2.5 bottom-2.5 bg-transparent font-medium rounded-lg text-sm px-4 py-2"
                >
                  <font-awesome-icon
                    class="text-secondaryColor"
                    :icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>

            <div class="mt-5 text-center footer">
              <hr class="mt-10 border-secondaryColor" />
              <p class="mt-3 text-[18px] font-bold">
                Not have account ?
                <router-link to="/register" class="text-secondaryColor"
                  >Register</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const password = ref("");
const confirm_password = ref("");

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<style lang="scss" scoped></style>
