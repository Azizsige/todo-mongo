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
            <p class="text-[24px] font-Rowdies">Reset Your Password</p>
          </div>

          <form>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
                >Input your new password :
              </label>
              <input
                type="password"
                v-model="password"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="new password"
                required
              />
            </div>

            <button
              type="submit"
              @click.prevent="resetPassword"
              class="text-white bg-secondaryColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const password = ref("");
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["resetPassword"]);
const token = route.params.token;

const resetPassword = () => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  // axios with urlsearchparams
  const params = new URLSearchParams();

  params.append("password", password.value);

  axios
    .post(
      "https://todo-mongo-api-one.vercel.app/api/auth/reset-password/" + token,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
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
      let err = error.response.data.message;
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Session sudah berakhir`,
        text: " Silahkan minta link verifikasi email kembali",
        allowOutsideClick: false,
      });
      router.push("/forgot-password");
    });
};

onMounted(() => {
  console.log(route.params.token);
});
</script>

<style lang="scss" scoped></style>
