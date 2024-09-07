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
      launchStore.fetchSavedLaunches();
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
      :deleteLaunch="launchStore.deleteLaunch"
      :showDeleteButton="true"
    />
  </div>
</template>
<style></style>
