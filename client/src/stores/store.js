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
    // data user
    dataUser: null,

    isUserLoggedIn: false,
  }),
  persist: {
    paths: ["isUserLoggedIn", "accessToken", "refreshToken"],
  },
});
