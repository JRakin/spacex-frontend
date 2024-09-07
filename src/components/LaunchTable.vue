<template>
  <h1 class="text-2xl font-semibold py-4 mb-5">SpaceX Launches</h1>
  <table class="w-full table-auto border-collapse">
    <thead>
      <tr class="bg-gray-100 text-left text-lg">
        <th class="p-4 font-semibold border-b">Flight Number</th>
        <th class="p-4 font-semibold border-b">Name</th>
        <th class="p-4 font-semibold border-b">Date</th>
        <th class="p-4 font-semibold border-b">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="launch in launches"
        :key="launch.name"
        class="hover:bg-gray-50 transition-colors"
      >
        <td class="p-4 border-b">{{ launch.flight_number }}</td>
        <td class="p-4 border-b" data-testid="launch-name">{{ launch.name }}</td>
        <td class="p-4 border-b">{{ convertDate(launch.date_utc) }}</td>
        <td class="p-4 border-b">
          <button
            class="py-2 px-4 border bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md transition-all"
            v-if="!showDeleteButton"
            @click="addLaunch?.(launch)"
            data-testid="add-button"
          >
            Add
          </button>
          <button
            class="py-2 px-4 border bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md transition-all"
            v-else="showDeleteButton"
            @click="deleteLaunch?.(launch._id)"
            data-testid="delete-button"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { convertDate } from "@/helper/helper";
import type { Launch } from "@/types/launch";

const props = defineProps<{
  launches: Launch[];
  showDeleteButton?: boolean;
  addLaunch?: (launch: Launch) => void;
  deleteLaunch?: (id: string) => void;
}>();
</script>
<style></style>
