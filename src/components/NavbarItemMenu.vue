<template>
  <div
    id="navbar-with-mega-menu"
    class="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow lg:block"
  >
    <div
      class="flex flex-col gap-12 mt-5 lg:gap-8 xl:gap-12 lg:flex-row lg:items-center lg:justify-end lg:mt-0 lg:pl-5"
    >
      <!-- <router-link
            aria-current="page"
            class="font-medium text-blue-500 text-[20px]"
            to="/"
            >Home</router-link
          >
          <router-link
            aria-current="page"
            class="font-medium text-[20px] text-gray-600 hover:text-gray-400"
            to="/about"
            >About</router-link
          >
          <router-link
            aria-current="page"
            class="font-medium text-[20px] text-gray-600 hover:text-gray-400"
            to="/service"
            >Services</router-link
          >
          <router-link
            aria-current="page"
            class="font-medium text-[20px] text-gray-600 hover:text-gray-400"
            to="/sales"
            >Pricing</router-link
          >
          <router-link
            aria-current="page"
            class="font-medium text-[20px] text-gray-600 hover:text-gray-400"
            to="/webinar"
            >Webinar</router-link
          >
          <router-link
            aria-current="page"
            class="font-medium text-[20px] text-gray-600 hover:text-gray-400"
            to="/contact-us"
            ><button
              type="button"
              class="py-[.688rem] text-[20px] px-4 inline-flex w-[157px] justify-center items-center gap-2 rounded-[20px] border-2 border-secondaryColor font-semibold text-secondaryColor hover:text-white hover:bg-secondaryColor focus:outline-none f transition-all text-sm"
            >
              Contact Us
            </button></router-link
          > -->

      <router-link
        v-for="item in menuItems.menuItems"
        :key="item.id"
        :to="item.link"
        :class="item.class"
        aria-current="page"
        >{{ item.name }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
const menuItems = defineProps({
  menuItems: Array,
});
</script>

<style lang="scss" scoped></style>
