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

    // data todo for update
    todoTitleStore: null,
    todoDescriptionStore: null,
  }),
  getters: {
    async getTodoLength() {
      return this.dataUser.length;
    },
  },
  actions: {
    async getData() {
      try {
        const response = await axios.get(
          "https://todo-mongo-api-one.vercel.app/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${this.refreshToken}`,
            },
          }
        );
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
        .post("https://todo-mongo-api-one.vercel.app/api/todos/", params, {
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
          if (res.data.status) {
            description = "";
            title = "";
            this.getData();
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
        return axios
          .delete(`https://todo-mongo-api-one.vercel.app/api/todos/${id}`, {
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
            this.getData();
            this.getTodoLength();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodoStore(id, description, title) {
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
        .put(`https://todo-mongo-api-one.vercel.app/api/todos/${id}`, params, {
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateIsDone(id, isDone) {
      const params = new URLSearchParams();
      params.append("isDone", isDone);
      await axios
        .patch(
          `https://todo-mongo-api-one.vercel.app/api/todos/${id}`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            // router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
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
