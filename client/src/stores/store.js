import { defineStore } from "pinia";
import axios from "axios";

import Swal from "sweetalert2";

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
    // async getTodoLength() {
    //   return await this.dataUser.length;
    // },
  },
  actions: {
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
    async addTodoStore(description, title) {
      Swal.fire({
        title: "Please Wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const params = new URLSearchParams();

      params.append("description", description);
      params.append("title", title);

      await axios
        .post("http://localhost:3000/api/todos/", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: `${res.data.message}`,
          });

          // console.log(res.data);
          if (res.data.status) {
            description = "";
            title = "";
            // router.push("/");
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTodo(id) {
      try {
        Swal.fire({
          title: "Please Wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        axios
          .delete(`http://localhost:3000/api/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: `${res.data.message}`,
            });
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    testingStoreAction() {
      console.log("testing store action");
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
