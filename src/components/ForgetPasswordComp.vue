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
            <p class="text-[24px] font-Rowdies">Forget Password</p>
          </div>

          <form>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Input your email :
              </label>
              <input
                type="email"
                v-model="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username or email"
                required
              />
            </div>

            <button
              type="submit"
              @click.prevent="forgetPassword"
              class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Send Link Reset Password
            </button>

            <div class="mt-5 text-center footer">
              <hr class="mt-10 border-secondaryColor" />
              <p class="mt-3 text-[18px] font-bold">
                Remember your password?
                <router-link to="/login" class="text-secondaryColor"
                  >Login</router-link
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

const email = ref("");
const emit = defineEmits(["forgetPassword"]);

const forgetPassword = () => {
  emit("forgetPassword", email.value);
};
</script>

<style lang="scss" scoped></style>
