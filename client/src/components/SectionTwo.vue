<template>
  <div v-motion-pop :delay="200" class="section2--wrapper">
    <div class="lg:space-y-24 wrapper_container">
      <div class="text-center mt-28 container-heading">
        <h1
          class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
        >
          Don’t let your day doing nothing
        </h1>
      </div>
      <div
        class="flex flex-row flex-wrap items-center mx-auto mt-10 space-y-10 text-center justify-evenly lg:justify-center lg:space-y-0 lg:space-x-40 container-card"
      >
        <div class="mt-10 text-center card lg:mt-0">
          <img class="w-12 lg:w-auto" src="/img/task.png" alt="" srcset="" />
          <h4 class="mt-5 text-sm text-gray-900 lg:text-xl">Small task</h4>
        </div>
        <div class="text-center card">
          <img class="w-12 lg:w-auto" src="/img/write.png" alt="" srcset="" />
          <h4 class="mt-5 text-sm text-gray-900 lg:text-xl">Write it</h4>
        </div>
        <div class="text-center card">
          <img class="w-12 lg:w-auto" src="/img/time.png" alt="" srcset="" />
          <h4 class="mt-5 text-sm text-gray-900 lg:text-xl">Do it</h4>
        </div>
        <div class="text-center card">
          <img
            class="w-12 lg:w-auto"
            src="/img/schedule.png"
            alt=""
            srcset=""
          />
          <h4 class="mt-5 text-sm text-gray-900 lg:text-xl">Repeat</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
