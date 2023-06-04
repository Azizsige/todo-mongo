<template>
  <div>
    <Navbar :menuItems="menuItems" />
    <Jumbotron
      title="Organizing your day activity with Todo Daily"
      image="/img/jumbotron.png"
      alt="Random image from Picsum"
      buttonText="Get Started"
      :precentange="false"
    />
    <SectionTwo />
    <SectionThree />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Jumbotron from "../components/Jumbotron.vue";
import SectionTwo from "../components/SectionTwo.vue";
import SectionThree from "../components/SectionThree.vue";
import Footer from "../components/Footer.vue";

import { reactive, ref } from "vue";

const menuItems = reactive([
  {
    id: 1,
    name: "Login",
    link: "/login",
    class:
      "font-medium text-lg lg:text-[26px] text-gray-600 hover:text-secondaryColor",
  },
  {
    id: 2,
    name: "Register",
    link: "/register",
    class:
      "font-medium text-lg lg:text-[26px] text-black hover:text-secondaryColor",
  },
]);
</script>

<style lang="scss" scoped></style>
