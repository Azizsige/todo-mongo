<template>
  <ForgetPasswordComp @forgetPassword="forgetPassword" />
</template>

<script setup>
import ForgetPasswordComp from "./../components/ForgetPasswordComp.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "./../stores/store.js";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";

const toast = useToast();
const router = useRouter();
const store = useStore();
const email = ref("");

const forgetPassword = (email) => {
  Swal.fire({
    title: "Please Wait...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const params = new URLSearchParams();

  params.append("email", email);

  axios
    .post(
      "https://todo-mongo-api-one.vercel.app/api/auth/forgot-password",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // withCredentials: true,
      }
    )
    .then((res) => {
      if (res.data.status) {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          html: `<h1 class="text-3xl font-bold">${res.data.message}</h1> <br> <span class="text-secondaryColor">Silahkan cek email kamu</span> di kotak <span class="text-secondaryColor">Inbox</span> atau <span class="text-secondaryColor">Spam</span> `,
        });
        router.push("/login");
        // setAuthTokenCookie(accessToken);
      } else {
        console.log(res.data.message);
        // store.isUserLoggedIn = false;
        // store.userToken = null;
        Swal.fire({
          icon: "error",
          title: `${res.data.message}`,
        });
      }
    })
    .catch((error) => {
      console.log(error.response.data);
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
  if (store.isUserLoggedIn == true) {
    router.push("/dashboard");
  }
});
</script>

<style lang="scss" scoped></style>
