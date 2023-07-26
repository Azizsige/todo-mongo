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
            <p class="text-[24px] font-Rowdies">Signin</p>
          </div>

          <form>
            <div class="mb-6">
              <label
                for="fullName"
                class="block mb-2 text-lg font-bold text-black dark:text-white"
                >Full Name :
              </label>
              <input
                type="text"
                id="fullName"
                v-model="fullName"
                class="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="username"
                class="block mb-2 text-lg font-bold text-black dark:text-white"
                >Username :
              </label>
              <input
                type="text"
                id="username"
                v-model="username"
                class="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Username"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="jenisKelamin"
                class="block mb-2 text-lg font-bold text-black dark:text-white"
                >Jenis Kelamin :
              </label>
              <select
                v-model="jenisKelamin"
                id="jenisKelamin"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Pilih Jenis Kelamin :</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Email :
              </label>
              <input
                type="email"
                id="email"
                v-model="email"
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
            <div class="mb-6">
              <label
                for="confirm_password"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Confirm Password :
              </label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirm_password"
                  id="confirm_password"
                  class="block w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondaryColor focus:border-secondaryColor"
                  placeholder="Confirm Your Password"
                  required
                />
                <button
                  @click="toggleConfirmPassword"
                  type="button"
                  class="text-white absolute right-2.5 bottom-2.5 bg-transparent font-medium rounded-lg text-sm px-4 py-2"
                >
                  <font-awesome-icon
                    class="text-secondaryColor"
                    :icon="
                      showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
                    "
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              @click.prevent="register"
              class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Register
            </button>

            <div class="mt-5 text-center footer">
              <hr class="mt-10 border-secondaryColor" />
              <p class="mt-3 text-[18px] font-bold">
                Already have account ?
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "./../stores/store.js";

import { useToast } from "vue-toastification";
import Swal from "sweetalert2";

const toast = useToast();
const router = useRouter();
const store = useStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const password = ref("");
const username = ref("");
const email = ref("");
const confirm_password = ref("");
const fullName = ref("");
const jenisKelamin = ref("");

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const register = () => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  // axios with urlsearchparams
  const params = new URLSearchParams();
  params.append("username", username.value);
  params.append("email", email.value);
  params.append("password", password.value);
  params.append("confirmPassword", confirm_password.value);
  params.append("fullName", fullName.value);
  params.append("jenisKelamin", jenisKelamin.value);

  axios
    .post("https://todo-mongo-api-one.vercel.app/api/auth/register", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res.data.message);
      Swal.fire({
        icon: "success",
        title: `${res.data.message}`,
        text: "Silahkan login untuk melanjutkan",
      });
      router.push("/login");
    })
    .catch((error) => {
      Swal.close();
      let err = error.response.data.errors;
      console.log(error);
      let length = Object.keys(err).length;
      // looping object err
      for (let key in err) {
        let msg = err[key];
        toast.error(msg.msg, {
          position: "top-right",
          timeout: 1500,
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
    });
};

onMounted(() => {
  if (store.isUserLoggedIn) {
    router.push("/dashboard");
  }
});
</script>

<style lang="scss" scoped></style>
