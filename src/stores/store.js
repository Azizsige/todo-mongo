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

    // data user
    userFullNameStore: null,
    userNameStore: null,
    userEmailStore: null,
    userIdStore: null,
    userJenisKelamin: null,
    // data user
    dataUser: null,

    isUserLoggedIn: false,
    isSwalShown: false,
    isRefreshingToken: false, // Tambahkan state untuk menandakan apakah sedang dalam proses refresh token
    isTodoAdded: false,
    isTodoUpdated: false,
    isTodoDeleted: false,
    isTodoDone: false,
    isTokenExpiredAlertShown: false,

    // data todo for update
    todoTitleStore: null,
    todoDescriptionStore: null,

    isRefreshingTokenStatus: false,
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
            // await this.refreshToken();
          }

          return this.dataUser;
        } catch (error) {
          if (
            error.response.data.message === "Invalid token or token expired"
          ) {
            if (!this.isRefreshingToken) {
              // this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = false;
            }
            if (!this.isTokenExpiredAlertShown) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              // this.isTokenExpiredAlertShown = true; // Set state menjadi true
              this.refreshToken();
              // this.getData();
            }
          } else {
            this.dataUser = null;
            return;
          }
        }
      }
    },
    async deleteTodo(id) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }

      if (this.isRefreshingToken) {
        return; // Jika sedang melakukan refresh token, keluar dari fungsi
      }

      if (!this.isSwalShown) {
        // this.isSwalShown = true;
        Swal.fire({
          title: "Please Wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      await axios
        .delete(`https://todo-mongo-api-one.vercel.app/api/todos/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then(async (res) => {
          console.log(res.data.status);
          if (res.data.status) {
            this.isTodoDeleted = true; // Todo berhasil ditambahkan
            this.getData();
            if (!this.isRefreshingToken) {
              Swal.fire({
                icon: "success",
                title: `Todo Berhasil Dihapus`,
              });
            }
            return; // Keluar dari fungsi setelah todo ditambahkan
          }
        })
        .catch(async (err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "Invalid token or token expired") {
            if (!this.isRefreshingToken) {
              // this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = false;
            }
            if (!this.isTokenExpiredAlertShown) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              // this.isTokenExpiredAlertShown = true; // Set state menjadi true
              this.deleteTodo(id);
              // this.getData();
            }
          } else {
            this.dataUser = null;
            return;
          }
        });
    },

    async addTodoStore(description, title) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }

      if (this.isRefreshingToken) {
        return; // Jika sedang melakukan refresh token, keluar dari fungsi
      }

      if (!this.isSwalShown) {
        // this.isSwalShown = true;
        Swal.fire({
          title: "Please Wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

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
          console.log(res.data.status);
          if (res.data.status) {
            description = "";
            title = "";
            this.isTodoAdded = true; // Todo berhasil ditambahkan
            this.getData();
            if (!this.isRefreshingToken) {
              Swal.fire({
                icon: "success",
                title: `Todo Berhasil Ditambahkan`,
              });
            }
            return; // Keluar dari fungsi setelah todo ditambahkan
          }
        })
        .catch(async (err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "Invalid token or token expired") {
            if (!this.isRefreshingToken) {
              // this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = false;
            }
            if (!this.isTokenExpiredAlertShown) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              // this.isTokenExpiredAlertShown = true; // Set state menjadi true
              this.addTodoStore(description, title);
              // this.getData();
            }
          } else {
            this.dataUser = null;
            return;
          }
        });
    },

    async updateTodoStore(id, description, title) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }

      if (this.isRefreshingToken) {
        return; // Jika sedang melakukan refresh token, keluar dari fungsi
      }

      if (!this.isSwalShown) {
        // this.isSwalShown = true;
        Swal.fire({
          title: "Please Wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      await axios;
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
        .then(async (res) => {
          console.log(res.data.status);
          if (res.data.status) {
            this.isTodoUpdated = true; // Todo berhasil ditambahkan
            this.getData();
            if (!this.isRefreshingToken) {
              Swal.fire({
                icon: "success",
                title: `Todo Berhasil Diupdate`,
              });
            }
            return; // Keluar dari fungsi setelah todo ditambahkan
          }
        })
        .catch(async (err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "Invalid token or token expired") {
            if (!this.isRefreshingToken) {
              // this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = false;
            }
            if (!this.isTokenExpiredAlertShown) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              // this.isTokenExpiredAlertShown = true; // Set state menjadi true
              this.updateTodoStore(id, description, title);
              // this.getData();
            }
          } else {
            this.dataUser = null;
            return;
          }
        });
    },

    async updateIsDone(id, isDone) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }

      if (this.isRefreshingToken) {
        return; // Jika sedang melakukan refresh token, keluar dari fungsi
      }

      // if (!this.isSwalShown) {
      //   // this.isSwalShown = true;
      //   Swal.fire({
      //     title: "Please Wait...",
      //     allowOutsideClick: false,
      //     didOpen: () => {
      //       Swal.showLoading();
      //     },
      //   });
      // }

      await axios;
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
        .then(async (res) => {
          console.log(res.data.status);
          if (res.data.status) {
            this.isTodoDone = true; // Todo berhasil ditambahkan
            this.getData();
            return; // Keluar dari fungsi setelah todo ditambahkan
          }
        })
        .catch(async (err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "Invalid token or token expired") {
            if (!this.isRefreshingToken) {
              // this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = false;
            }
            if (!this.isTokenExpiredAlertShown) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              // this.isTokenExpiredAlertShown = true; // Set state menjadi true
              this.updateIsDone(id, isDone);
              // this.getData();
            }
          } else {
            this.dataUser = null;
            return;
          }
        });
    },
    async logout() {
      Swal.fire({
        title: "Please Wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const params = new URLSearchParams();
      params.append("userId", this.userIdStore);
      params.append("accessToken", this.accessToken);

      try {
        const response = await axios.post(
          `https://todo-mongo-api-one.vercel.app/api/auth/logout`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: `Logout Berhasil`,
        });

        this.isUserLoggedIn = false;
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async refreshToken() {
      let isSwalOpen = false;

      const params = new URLSearchParams();
      params.append("userId", this.userIdStore);

      try {
        const response = await axios.post(
          `https://todo-mongo-api-one.vercel.app/api/auth/refresh-token`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(response.data);
        if (response.data.status) {
          this.isRefreshingTokenStatus = response.data.status;
          this.accessToken = response.data.accessToken;
          this.getData();
          console.log(response.data);
        }
      } catch (err) {
        console.log(err.response.data);
        this.isRefreshingTokenStatus = err.response.data.status;
        this.accessToken = null;
        this.userIdStore = null;
        this.userNameStore = null;
        this.userEmailStore = null;
        this.userJenisKelamin = null;
        this.userFullNameStore = null;
        this.isUserLoggedIn = false;
        if (
          err.response.data.status == "false" &&
          !this.isTokenExpiredAlertShown
        ) {
          this.isTokenExpiredAlertShown = true;
          // Set state menjadi true
          Swal.fire({
            icon: "error",
            title: `${err.response.data.message}`,
            text: "Silahkan Login Kembali",
            showConfirmButton: true,
            confirmButtonText: "Login",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.isUserLoggedIn = false;
              location.reload();
            }
          });
        }
      }
    },
  },
  persist: {
    paths: [
      "isUserLoggedIn",
      "userNameStore",
      "userEmailStore",
      "userJenisKelamin",
      "userFullNameStore",
      "userIdStore",
      "accessToken",
    ],
  },
});
