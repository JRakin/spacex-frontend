<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useLaunchStore } from "../stores/launchStores";

export default defineComponent({
  setup() {
    const launchStore = useLaunchStore();

    onMounted(() => {
      launchStore.fetchAllLaunches();
    });

    return { launchStore };
  },
});
</script>
<template>
  <div class="p-10">
    <div>
      <h1 class="text-xl font-semibold py-4 mb-5">SpaceX Launches</h1>
    </div>
    <div>
      <table
        v-if="launchStore.launches?.length"
        class="w-full"
      >
        <thead>
          <tr class="text-left font-semibold">
            <th>Flight Number</th>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="launch in launchStore.launches"
            :key="launch.flight_number"
          >
            <td class="p-2">{{ launch.flight_number }}</td>
            <td class="p-2">{{ launch.name }}</td>
            <td class="p-2">
              {{ new Date(launch?.date_utc).toLocaleString() }}
            </td>
            <td class="p-2">
              <button class="p-2">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
