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
    isSwalShown: false,
    isRefreshingToken: false, // Tambahkan state untuk menandakan apakah sedang dalam proses refresh token
    isTodoAdded: false,

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
            // await this.refreshToken();
          } else {
            if (response.data.message === "Invalid token or token expired") {
              await this.refreshToken();
            } else {
              this.dataUser = null;
            }
          }

          return this.dataUser;
        } catch (error) {
          if (error.response.data.status == "false") {
            // Swal.fire({
            //   icon: "error",
            //   title: `${error.response.data.message}`,
            // });
            await this.refreshToken();
            // router.push({ name: "Login" });
          }
        }
      }
    },
    // async addTodoStore(description, title) {
    //   if (this.isUserLoggedIn === false) {
    //     return (this.dataUser = null);
    //   }

    //   if (!this.isSwalShown) {
    //     // Periksa apakah SweetAlert sudah ditampilkan sebelumnya
    //     this.isSwalShown = true; // Set flag menjadi true agar SweetAlert hanya muncul sekali
    //     Swal.fire({
    //       title: "Please Wait...",
    //       allowOutsideClick: false,
    //       didOpen: () => {
    //         Swal.showLoading();
    //       },
    //     });
    //   }

    //   const params = new URLSearchParams();

    //   params.append("description", description);
    //   params.append("title", title);

    //   await axios
    //     .post("https://todo-mongo-api-one.vercel.app/api/todos/", params, {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer ${this.accessToken}`,
    //       },
    //     })
    //     .then(async (res) => {
    //       Swal.fire({
    //         icon: "success",
    //         title: `${res.data.message}`,
    //       });
    //       if (res.data.status) {
    //         description = "";
    //         title = "";
    //         this.getData();
    //         this.getTodoLength;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //       if (err.response.data.message === "Invalid token or token expired") {
    //         Swal.close();
    //         this.refreshToken();

    //         this.addTodoStore(description, title);

    //         this.getData();
    //       } else {
    //         this.dataUser = null;
    //         return;
    //       }
    //       // if (err.response.data.status === "false") {
    //       //   Swal.close();
    //       //   this.refreshToken();

    //       //   this.addTodoStore(description, title);

    //       //   this.getData();

    //       //   console.log(err.response.data.message);
    //       // }
    //       // this.refreshToken();
    //     })
    //     .finally(() => {
    //       if (this.isSwalShown) {
    //         // Periksa apakah SweetAlert sedang ditampilkan
    //         this.isSwalShown = false; // Set flag menjadi false agar SweetAlert dapat ditampilkan lagi
    //       }
    //     });
    // },
    deleteTodo(id) {
      try {
        if (!this.isSwalShown) {
          // Periksa apakah SweetAlert sudah ditampilkan sebelumnya
          this.isSwalShown = true; // Set flag menjadi true agar SweetAlert hanya muncul sekali
          Swal.fire({
            title: "Please Wait...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
        }
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
          })
          .finally(() => {
            if (this.isSwalShown) {
              // Periksa apakah SweetAlert sedang ditampilkan
              this.isSwalShown = false; // Set flag menjadi false agar SweetAlert dapat ditampilkan lagi
            }
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

    async addTodoStore(description, title) {
      if (this.isUserLoggedIn === false) {
        return (this.dataUser = null);
      }

      if (this.isRefreshingToken) {
        return; // Jika sedang melakukan refresh token, keluar dari fungsi
      }

      if (!this.isSwalShown) {
        this.isSwalShown = true;
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
          if (err.response.data.message === "Invalid token or token expired") {
            Swal.close();
            if (!this.isRefreshingToken) {
              this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
              await this.refreshToken();
              this.isRefreshingToken = false; // Refresh token selesai
              this.isSwalShown = true;
            }
            if (!this.isTodoAdded) {
              // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
              this.addTodoStore(description, title);
            }
          } else {
            this.dataUser = null;
            return;
          }
        })
        .finally(() => {
          if (this.isSwalShown) {
            this.isSwalShown = false;
          }
        });
    },

    // async addTodoStore(description, title) {
    //   if (this.isUserLoggedIn === false) {
    //     return (this.dataUser = null);
    //   }

    //   if (this.isRefreshingToken) {
    //     return; // Jika sedang melakukan refresh token, keluar dari fungsi
    //   }

    //   if (!this.isSwalShown) {
    //     this.isSwalShown = true;
    //     Swal.fire({
    //       title: "Please Wait...",
    //       allowOutsideClick: false,
    //       didOpen: () => {
    //         Swal.showLoading();
    //       },
    //     });
    //   }

    //   const params = new URLSearchParams();
    //   params.append("description", description);
    //   params.append("title", title);

    //   await axios
    //     .post("https://todo-mongo-api-one.vercel.app/api/todos/", params, {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer ${this.accessToken}`,
    //       },
    //     })
    //     .then(async (res) => {
    //       Swal.fire({
    //         icon: "success",
    //         title: `${res.data.message}`,
    //       });
    //       if (res.data.status) {
    //         description = "";
    //         title = "";
    //         this.isTodoAdded = true; // Todo berhasil ditambahkan
    //         this.getData();
    //         return; // Keluar dari fungsi setelah todo ditambahkan
    //       }
    //     })
    //     .catch(async (err) => {
    //       if (err.response.data.message === "Invalid token or token expired") {
    //         Swal.close();
    //         if (!this.isRefreshingToken) {
    //           Swal.fire({
    //             icon: "success",
    //             title: `Todo Berhasil Ditambahkan`,
    //           });
    //           this.isRefreshingToken = true; // Menandakan proses refresh token sedang berlangsung
    //           await this.refreshToken();
    //           this.isRefreshingToken = false; // Refresh token selesai
    //           // this.addTodoStore(description, title); // Panggil kembali fungsi addTodoStore
    //         }
    //         if (!this.isTodoAdded) {
    //           // Jika todo belum berhasil ditambahkan, panggil kembali addTodoStore
    //           this.addTodoStore(description, title);
    //         }
    //       } else {
    //         this.dataUser = null;
    //         return;
    //       }
    //     })
    //     .finally(() => {
    //       if (this.isSwalShown) {
    //         this.isSwalShown = false;
    //       }
    //     });
    // },
    async updateTodoStore(id, description, title) {
      if (!this.isSwalShown) {
        // Periksa apakah SweetAlert sudah ditampilkan sebelumnya
        this.isSwalShown = true; // Set flag menjadi true agar SweetAlert hanya muncul sekali
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
        })
        .finally(() => {
          if (this.isSwalShown) {
            // Periksa apakah SweetAlert sedang ditampilkan
            this.isSwalShown = false; // Set flag menjadi false agar SweetAlert dapat ditampilkan lagi
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
          if (!this.isSwalShown) {
            this.accessToken = response.data.accessToken;
            this.getData();
            console.log(response.data);
          }
        }
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data.status == "false") {
          console.log(err.response.data);
          if (!this.isSwalShown) {
            this.isSwalShown = true;
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
      }
    },
    // async refreshToken() {
    //   // Flag untuk memastikan Swal.fire hanya dipanggil sekali
    //   let isSwalOpen = false;

    //   const params = new URLSearchParams();
    //   params.append("userId", this.userIdStore);

    //   try {
    //     const response = await axios.post(
    //       `https://todo-mongo-api-one.vercel.app/api/auth/refresh-token`,
    //       params,
    //       {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //       }
    //     );

    //     console.log(response.data);
    //     if (response.data.status) {
    //       if (!this.isSwalShown) {
    //         this.accessToken = response.data.accessToken;
    //         // alert("Token Refreshed");
    //         // router.push("/");
    //         this.getData();
    //         console.log(response.data);
    //         // this.getTodoLength;
    //       }
    //     }
    //   } catch (err) {
    //     // Swal.close();
    //     console.log(err.response.data);
    //     if (err.response.data.status == "false") {
    //       console.log(err.response.data);
    //       if (!this.isSwalShown) {
    //         // Periksa apakah SweetAlert sudah ditampilkan
    //         this.isSwalShown = true; // Set flag menjadi true agar tidak muncul lagi saat pemanggilan berikutnya
    //         Swal.fire({
    //           icon: "error",
    //           title: `${err.response.data.message}`,
    //           text: "Silahkan Login Kembali",
    //           showConfirmButton: true,
    //           confirmButtonText: "Login",
    //           allowOutsideClick: false,
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             this.isUserLoggedIn = false;
    //             location.reload();
    //           }
    //           // this.isSwalShown = false; // Set flag menjadi false setelah SweetAlert ditutup
    //         });
    //       }
    //     }
    //   }
    // },
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
