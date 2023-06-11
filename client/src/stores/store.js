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
    async getData() {
      try {
        const response = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        });
        this.dataUser = response.data.user.todos;
        return this.dataUser;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async addTodo(todo) {
      this.dataUser.push(todo);
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
