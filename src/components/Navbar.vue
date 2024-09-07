<script setup lang="ts"></script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-green-500 p-6">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-lg lg:flex-grow">
        <span class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
          <router-link to="/">Home</router-link>
        </span>
        <span class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
          <router-link to="/saved-launches">Saved Launches</router-link>
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
