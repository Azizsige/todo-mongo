<script setup>
import SidebarMenus from "../components/SidebarMenus.vue";
import { reactive } from "vue";

const sidebar = reactive([
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
  },
]);
</script>
<template>
  <div>
    <SidebarMenus :sidebars="sidebar" />
  </div>
</template>
>

<style lang="scss" scoped></style>
