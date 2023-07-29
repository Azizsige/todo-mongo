import { defineStore } from "pinia";
import axios from "axios";
import { useStore } from "./store.js";
import { useRouter } from "vue-router";

import Swal from "sweetalert2";

export const useProfilesStore = defineStore("profilesStore", {
  state: () => ({
    isRefreshingToken: false,
    isSwalShown: false,
    isProfilesUpdated: false,
    isProfilesDeleted: false,
    isTokenExpiredAlertShown: false,

    accessToken: null,
    idProfiles: null,
  }),
  actions: {
    async updateProfile(id, fullName, username, email, jenisKelamin) {
      const store = useStore();
      this.idProfiles = store.userIdStore;
      this.accessToken = store.accessToken;

      if (this.isRefreshingToken) return;

      if (!this.isSwalShown) {
        Swal.fire({
          title: "Please Wait...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      const params = new URLSearchParams();
      params.append("fullName", fullName);
      params.append("username", username);
      params.append("email", email);
      params.append("jenisKelamin", jenisKelamin);

      await axios
        .put(
          `https://todo-mongo-api-one.vercel.app/api/users/update/${id}`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then(async (res) => {
          console.log(res.data);
          if (res.data.status) {
            this.isProfilesUpdated = true;
            if (!this.isRefreshingToken) {
              Swal.fire({
                icon: "success",
                title: "Profile Berhasil di Updated",
              });
            }
            store.userNameStore = res.data.user.username;
            store.userFullNameStore = res.data.user.fullName;
            store.userEmailStore = res.data.user.email;
            store.userJenisKelamin = res.data.user.jenisKelamin;
            return;
          }
        })
        .catch(async (err) => {
          console.log(err.response);
          if (err.response.data.message === "Invalid token or token expired") {
            if (!this.isRefreshingToken) {
              await store.refreshToken();
              if (store.isRefreshingTokenStatus === "false") {
                this.isRefreshingToken = true;
                this.isSwalShown = true;
              } else {
                this.isRefreshingToken = false;
                this.isSwalShown = false;
              }
            }
            if (!this.isTokenExpiredAlertShown) {
              this.updateProfile(id, fullName, username, email, jenisKelamin);
            }
          }
        });
    },
    async deleteProfile(id) {
      const store = useStore();
      const router = useRouter();
      this.idProfiles = store.userIdStore;
      this.accessToken = store.accessToken;
      if (this.isRefreshingToken) return;

      Swal.fire({
        title: `Apakah Anda Yakin Ingin Menghapus Profile Anda?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Tidak, Batal!",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (!this.isSwalSwhon) {
            Swal.fire({
              title: "Please Wait...",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
          }

          await axios
            .delete(
              `https://todo-mongo-api-one.vercel.app/api/users/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${this.accessToken}`,
                },
              }
            )
            .then(async (res) => {
              console.log(res.data);
              if (res.data.status) {
                store.isUserLoggedIn = false;
                store.accessToken = null;
                store.userEmailStore = null;
                store.userFullNameStore = null;
                store.userIdStore = null;
                store.userNameStore = null;
                store.userJenisKelamin = null;

                this.isProfilesDeleted = true;
                if (!this.isRefreshingToken) {
                  Swal.fire({
                    icon: "success",
                    title: "Akun Berhasil di Delete",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.reload();
                    }
                  });
                }
                router.push("/login");

                return;
              }
            })
            .catch(async (err) => {
              if (
                err.response.data.message ===
                "Internal Server Error or Token Expired"
              ) {
                if (!this.isRefreshingToken) {
                  await store.refreshToken();
                  this.isRefreshingToken = false;
                  this.isSwalSwhon = false;
                }
                if (!this.isTokenExpiredAlertShown) {
                  this.deleteProfile(id);
                }
              } else {
                console.log(err.response);
              }
            });
        }
      });
    },
    test() {
      const store = useStore();
      this.accessToken = store.accessToken;
      console.log(this.accessToken);
    },
  },
});
