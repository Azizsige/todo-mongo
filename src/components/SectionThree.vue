<template>
  <div v-motion-pop-visible :delay="200" class="px-4 section2--wrapper lg:px-0">
    <div
      class="flex flex-col justify-center lg:space-x-16 lg:flex-row wrapper_container"
    >
      <div class="mx-auto text-center lg:mx-0 mt-28 container-heading">
        <img
          src="/img/section3.png"
          class="lg:w-[583px] lg:h-[370px] w-auto h-auto"
          alt=""
          srcset=""
        />
      </div>
      <div
        class="flex flex-col items-start justify-center mt-8 text-center lg:mt-0 container-card"
      >
        <h1
          class="mx-auto mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl"
        >
          Achieve your target and won your life
        </h1>
        <div class="mx-auto text-center lg:mt-5">
          <router-link
            to="/login"
            class="inline-flex justify-center items-center py-3 w-[157px] px-5 text-base font-medium text-center text-white rounded-[20px] bg-secondaryColor"
          >
            Get Started
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
