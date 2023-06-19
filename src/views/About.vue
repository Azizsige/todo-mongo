<template>
  <div>
    <h1>About</h1>
  </div>
</template>

<script setup>
// get the router
import { useRoute } from "vue-router";

// get the current route
const route = useRoute();

// get the current route name
const routeName = route.path;

// get the current route params
const routeParams = route.params;

// get the current route query
const routeQuery = route.query;

// get the current route hash
const routeHash = route.hash;

console.log(routeName);
</script>

<style lang="scss" scoped></style>
