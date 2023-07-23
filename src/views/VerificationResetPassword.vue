<template>
  <div v-if="message == 'Token valid'">
    <ResetPasswordComp @resetPassword="resetPassword" />
  </div>
  <div v-else-if="message == 'Token expired'">
    <ExpiredTokenComp />
  </div>
  <div
    v-else-if="message == 'Internal Server Error'"
    class="text-center flex flex-col items-center justify-center h-screen"
  >
    <h1 class="lg:text-3xl xl:text-7xl text-xl">404</h1>
    <router-link to="/" class="text-secondaryColor">
      <h1 class="lg:text-3xl xl:text-3xl text-xl mt-7">Back to Home</h1>
    </router-link>
  </div>
</template>

<script setup>
import ResetPasswordComp from "./../components/ResetPasswordComp.vue";
import ExpiredTokenComp from "./../components/ExpiredTokenComp.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useResetPasswordStore } from "./../stores/resetPassword.js";

import Swal from "sweetalert2";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const password = ref("");
const store = useResetPasswordStore();
const isExpired = ref(false);
const token = route.params.token;
const message = ref("");

const resetPassword = (password) => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  // axios with urlsearchparams
  const params = new URLSearchParams();

  params.append("password", password);

  axios
    .post("http://localhost:5000/api/auth/reset-password/" + token, params, {
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

onMounted(async () => {
  await store.verifyToken(token);
  message.value = await store.message;
  console.log(message.value);

  if (message.value == "Token expired") {
    Swal.close();
    router.push({ name: "ExpiredToken" });
  } else {
    Swal.close();
    router.push({ name: "ResetPassword" });
  }
});

// decode token url params to get the expiry date
</script>

<style lang="scss" scoped></style>
