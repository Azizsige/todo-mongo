<template>
  <div>
    <!-- Jumbotron -->
    <div class="flex items-center w-full wrapper-jumbo" v-motion-pop>
      <div class="flex flex-col items-center px-4 mx-auto jumbo lg:px-0">
        <div class="mt-10 jumbo-text">
          <section class="mx-auto bg-white">
            <div class="py-8 lg:py-16">
              <h1
                class="mb-4 text-xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl"
              >
                {{ title }}
              </h1>
              <div class="text-center">
                <router-link
                  to="/login"
                  class="inline-flex justify-center items-center py-3 w-auto lg:w-[157px] px-5 text-base font-medium text-center text-white rounded-[20px] bg-secondaryColor"
                >
                  {{ buttonText }}
                </router-link>
              </div>
            </div>
          </section>
        </div>
        <div class="relative jumbo-img">
          <img class="h-full" :src="props.image" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
  alt: String,
  buttonText: String,
  precentange: Boolean,
});

import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

// check if the route is home page or not to show the precentange
onMounted(() => {
  if (route.path === "/") {
    props.precentange = true;
  } else {
    props.precentange = false;
  }
});
</script>

<style lang="css" scoped>
.circular {
  height: 100px;
  width: 100px;
  position: relative;
}

.circular .inner {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80px;
  width: 80px;
  background-color: #dde6f0;
  margin: -40px 0 0 -40px;
  border-radius: 100%;
  z-index: 6;
}

.circular .number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.circular .bar {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #cfefd1;
  -webkit-border-radius: 100%;
  clip: rect(0px, 100px, 100px, 50px);
}

.circle .bar .progress {
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-border-radius: 100%;
  clip: rect(0px, 50px, 100px, 0px);
  background: #029837;
}

.circle .left .progress {
  z-index: 1;
  animation: left 800ms linear both;
}

@keyframes left {
  100% {
    transform: rotate(180deg);
  }
}

.circle .right {
  transform: rotate(180deg);
  z-index: 3;
}

.circle .right .progress {
  animation: right 800ms linear both;
  animation-delay: 800ms;
}

@keyframes right {
  100% {
    transform: rotate(100deg);
  }
}
</style>
