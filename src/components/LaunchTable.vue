<template>
  <h1 class="text-2xl font-semibold py-4 mb-5">SpaceX Launches</h1>
  <table class="w-full">
    <thead>
      <tr class="text-left text-lg">
        <th class="p-2 font-semibold">Flight Number</th>
        <th class="p-2 font-semibold">Name</th>
        <th class="p-2 font-semibold">Date</th>
        <th class="p-2 font-semibold">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="launch in launches" :key="launch.name" class="p-2">
        <td class="p-2">{{ launch.flight_number }}</td>
        <td class="p-2">{{ launch.name }}</td>
        <td class="p-2">{{ launch.date_utc }}</td>
        <td class="p-2">
            <button class="py-1 px-5 border bg-green-400 font-semibold text-white" v-if="!showDeleteButton" @click="addLaunch?.(launch)">Add</button>
            <button class="py-1 px-5 border bg-red-400 font-semibold text-white" v-else="showDeleteButton" @click="deleteLaunch?.(launch._id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { Launch } from "@/types/launch";

const props = defineProps<{
  launches: Launch[];
  showDeleteButton?: boolean;
  addLaunch?: (launch: Launch) => void;
  deleteLaunch?: (id: string) => void;
}>();
console.log(props);
</script>
<style></style>