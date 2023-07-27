import { defineStore } from "pinia";
import axios from "axios";
import { useStore } from "./store.js";

import Swal from "sweetalert2";

export const useProfilesStore = defineStore("profilesStore", {
  state: () => ({
    isRefreshingToken: false,
    isSwalSwhon: false,
    isProfilesUpdated: false,
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

      if (!this.isSwalSwhon) {
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
        .put(`http://localhost:5000/api/users/update/${id}`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
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
            store.fullNameStore = res.data.user.fullName;
            store.userEmailStore = res.data.user.email;
            store.userJenisKelamin = res.data.user.jenisKelamin;
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
              this.updateProfile(id, fullName, username, email, jenisKelamin);
            }
          } else {
            console.log(err.response);
            // if (!this.isRefreshingToken) {
            //   Swal.fire({
            //     icon: "error",
            //     title: "Oops...",
            //     text: err.response.data.message,
            //   });
            // }
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
