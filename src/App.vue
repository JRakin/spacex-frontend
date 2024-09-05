<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar></Navbar>
  <main class="p-10 h-96">
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
