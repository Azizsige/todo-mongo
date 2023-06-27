import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

import Swal from "sweetalert2";

export const useStore = defineStore("store", {
  state: () => ({
    // user
    user: null,
    // auth
    auth: false,
    // token
    accessToken: null,
    accessToken: null,
    expiredAt: null,
    expiredAccessToken: null,
    expiredaccessToken: null,
    userNameStore: null,
    userEmailStore: null,
    userIdStore: null,
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

    async getIsDoneLength() {
      return this.dataUser.filter((todo) => todo.isDone === true).length;
    },
  },
  actions: {
    async getData() {
      // const getCurrentCookie = await cookies.get("accessToken");
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      } else {
        try {
          const response = await axios.get(
            "https://todo-mongo-api-one.vercel.app/api/users/me",
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`,
              },
              // withCredentials: true,
            }
          );

          if (response.data.status === "true") {
            this.dataUser = response.data.user.todos;
            console.log(response.data);
            console.log(this.accessToken);
            // await this.refreshToken();
          } else {
            await this.refreshToken();
          }

          return this.dataUser;
        } catch (error) {
          if (error.response.data.status == "false") {
            // Swal.fire({
            //   icon: "error",
            //   title: `${error.response.data.message}`,
            // });
            console.log(this.accessToken);
            await this.refreshToken();
            // router.push({ name: "Login" });
          }
        }
      }
    },
    async addTodoStore(description, title) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }
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
        .then(async (res) => {
          Swal.fire({
            icon: "success",
            title: `${res.data.message}`,
          });
          if (res.data.status) {
            description = "";
            title = "";
            this.getData();
            this.getTodoLength;
          } else {
            Swal.close();
            console.log("add todo with new token 1");
            this.refreshToken();
          }
        })
        .catch((err) => {
          if (err.response.data.status === "false") {
            Swal.close();
            this.refreshToken();

            this.addTodoStore(description, title);

            this.getData();

            console.log("add todo with new token 2");
          }
          // this.refreshToken();
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
            // console.log(res.data);
            this.getData();
            this.getTodoLength;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        if (err.response.data.status === "false") {
          this.refreshToken();
          this.deleteTodo();
          this.getData();

          console.log("delete todo with new token");
        }
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
            this.getData();
            this.getTodoLength;
          }
        })
        .catch((err) => {
          if (err.response.data.status === "false") {
            this.refreshToken();
            this.updateTodoStore(id, description, title);
            this.getData();

            console.log("update todo with new token");
          }
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
            this.getData();
            this.getTodoLength;
          }
        })
        .catch((err) => {
          if (err.response.data.status === "false") {
            this.refreshToken();
            this.updateIsDone(id, isDone);
            this.getData();

            console.log("update isdone todo with new token");
          }
        });
    },
    logout() {
      this.isUserLoggedIn = false;
    },
    async refreshToken() {
      const params = new URLSearchParams();

      params.append("userId", this.userIdStore);
      await axios
        .post(
          `https://todo-mongo-api-one.vercel.app/api/auth/refresh-token`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            Swal.close();
            this.accessToken = res.data.accessToken;
            // alert("Token Refreshed");
            // router.push("/");
            this.getData();
            // this.getTodoLength;
          }
        })
        .catch((err) => {
          Swal.close();
          if (err.response.data.status == "false") {
            // swall dengan tombol login
            Swal.fire({
              icon: "error",
              title: `${err.response.data.message}`,
              showConfirmButton: true,
              confirmButtonText: "Login",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.isUserLoggedIn = false;
                location.reload();
              }
            });
            // this.isUserLoggedIn = false;
            // location.reload();
          }
          console.log(err);
        });
    },
  },
  persist: {
    paths: [
      "isUserLoggedIn",
      "expiredAccessToken",
      "expiredaccessToken",
      "expiredAt",
      "userNameStore",
      "userEmailStore",
      "userIdStore",
      "accessToken",
    ],
  },
});
