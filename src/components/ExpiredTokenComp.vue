<template>
  <div class="wrapper bg-thirdColor">
    <div
      class="flex items-center justify-center h-screen mx-auto wrapper-container"
    >
      <div
        class="container-card bg-white shadow-lg w-[90%] lg:w-[512px] p-4 lg:p-7"
      >
        <div
          class="flex items-center card-header text-[36px] text-secondaryColor font-light space-x-2 font-Rowdies"
        >
          <img src="/img/icon.png" alt="" srcset="" />
          <p>Todo Daily</p>
        </div>
        <div class="mt-5 card-form text-center">
          <div class="mb-5 form__header">
            <p class="text-[24px] text-center font-Rowdies">Form is Expired</p>
          </div>
          <div class="description text-[18px] font-Rosario">
            <p>Link anda sudah kadaluwarsa</p>
            <p class="mt-1">
              Silahkan minta link
              <router-link to="/forgot-password" class="text-secondaryColor"
                >verifikasi email</router-link
              >
              kembali
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
