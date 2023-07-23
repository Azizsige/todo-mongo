import { defineStore } from "pinia";
import axios from "axios";

import Swal from "sweetalert2";

export const useResetPasswordStore = defineStore("useResetPasswordStore", {
  state: () => ({
    message: null,
  }),
  actions: {
    async verifyToken(token) {
      try {
        await axios
          .get(
            `https://todo-mongo-api-one.vercel.app/api/auth/verify-token/${token}`
          )
          .then((res) => {
            this.message = res.data.message;
            console.log(res.data);
          })
          .catch((err) => {
            this.message = err.response.data.message;
            console.log(err.response.data.message);
          });
      } catch (error) {
        this.message = error.response.message;
        console.log(error.response.message);
      }
    },
    async resetPassword(token, password) {
      Swal.fire({
        title: "Please Wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const params = new URLSearchParams();

      params.append("password", password);

      axios
        .post(
          `https://todo-mongo-api-one.vercel.app/api/auth/reset-password/${token}`,
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
            // Swal.fire({
            //   icon: "success",
            //   html: `<h1 class="text-3xl font-bold">${res.data.message}</h1> <br> <span class="text-secondaryColor">Silahkan cek email kamu</span> di kotak <span class="text-secondaryColor">Inbox</span> atau <span class="text-secondaryColor">Spam</span> `,
            // });
            // router.push("/login");
            // setAuthTokenCookie(accessToken);
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
    },
  },
});
