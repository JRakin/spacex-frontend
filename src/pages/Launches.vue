<script lang="ts">
import LaunchTable from "../components/LaunchTable.vue";
import { defineComponent, onMounted } from "vue";
import { useLaunchStore } from "../stores/launchStores";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  components: {
    LaunchTable,
    Spinner,
  },
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
    <div
      v-if="launchStore.loading"
      class="flex items-center justify-center min-h-screen"
    >
      <Spinner />
    </div>
    <LaunchTable
      :launches="launchStore.launches"
      :addLaunch="launchStore.addLaunch"
      :showDeleteButton="false"
    />
  </div>
</template>
<style></style>
