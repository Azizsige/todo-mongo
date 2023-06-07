import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    // user
    user: null,
    // auth
    auth: false,
    // token
    accessToken: null,
    refreshToken: null,
    expiredAt: null,
    expiredAccessToken: null,
    expiredRefreshToken: null,
    // data user
    dataUser: null,

    isUserLoggedIn: false,
  }),
  getters: {
    getData() {
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        })
        .then((response) => {
          this.dataUser = response.data.user.todos;
          console.log(this.dataUser);
          // console.log(this.dataUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  persist: {
    paths: [
      "isUserLoggedIn",
      "accessToken",
      "refreshToken",
      "expiredAccessToken",
      "expiredRefreshToken",
      "expiredAt",
    ],
  },
});
