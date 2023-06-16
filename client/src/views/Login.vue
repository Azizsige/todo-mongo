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
                v-model="email"
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
              @click.prevent="login"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { useStore } from "./../stores/store.js";

import { useToast } from "vue-toastification";
import Swal from "sweetalert2";

const toast = useToast();
const router = useRouter();
const store = useStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const confirm_password = ref("");
const password = ref("");
const email = ref("");

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const login = () => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const params = new URLSearchParams();

  params.append("email", email.value);
  params.append("password", password.value);

  axios
    .post("https://todo-mongo-api-one.vercel.app/api/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      if (res.data.status) {
        console.log(res.data);
        let accessToken = res.data.accessToken;
        let refreshToken = res.data.user.refreshToken;
        let expiredAt = res.data.user.updatedAt;
        let userName = res.data.user.username;
        let userEmail = res.data.user.email;
        store.accessToken = accessToken;
        store.refreshToken = refreshToken;
        store.expiredAt = expiredAt;
        store.isUserLoggedIn = true;
        store.userNameStore = userName;
        store.userEmailStore = userEmail;
        Swal.fire({
          icon: "success",
          title: `${res.data.message}`,
        });
        router.push("/dashboard");
      } else {
        // store.isUserLoggedIn = false;
        // store.userToken = null;
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
        });
      }
    })
    .catch((error) => {
      let errorValidation = error.response.data.errors;
      let errorAuth = error.response.data.message;
      console.log(errorValidation);
      console.log(errorAuth);
      if (errorValidation) {
        let length = Object.keys(errorValidation).length;
        // looping object err
        for (let key in errorValidation) {
          let msg = errorValidation[key];
          console.log(msg);
          toast.error(msg.msg, {
            position: "top-right",
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      } else {
        toast.error(errorAuth, {
          position: "top-right",
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      }
      Swal.close();
    });
};

onMounted(() => {
  store.dataUser = null;
  if (store.isUserLoggedIn) {
    router.push("/dashboard");
  }
});
</script>

<style lang="scss" scoped></style>
