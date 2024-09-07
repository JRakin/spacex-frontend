import { defineStore } from "pinia";
import { apiClient } from "@/helper/helper";
import type { Launch, LaunchState } from "@/types/launch";
import { toast } from "vue3-toastify";

export const useLaunchStore = defineStore("launchStore", {
  state: (): LaunchState => ({
    launches: [] as Array<{
      flight_number: number;
      name: string;
      date_utc: string;
      _id: string;
    }>,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllLaunches() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get<Launch[]>("launches/all");
        this.launches = response.data;
      } catch (err) {
        this.error = "Failed to fetch launches data";
        toast.error("Failed to fetch data");
      } finally {
        this.loading = false;
      }
    },

    async fetchSavedLaunches() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get<Launch[]>("launches");
        this.launches = response.data;
      } catch (err) {
        this.error = "Failed to fetch launches data";
      } finally {
        this.loading = false;
      }
    },

    async addLaunch(launch: Launch) {
      try {
        const response = await apiClient.post<Launch>("/launches", launch);
        this.launches = this.launches.filter(
          (item) =>
            item.flight_number !== launch.flight_number ||
            item.date_utc !== launch.date_utc
        );
        if (response) {
          toast.success("Launch added successfully");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred while adding the launch.");
        }
      }
    },

    async deleteLaunch(id: string) {
      try {
        const response = await apiClient.delete(`/launches/${id}`);
        this.launches = this.launches.filter((launch) => launch._id !== id);
        if (response) {
          toast.success("Launch deleted successfully");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred while deleting the launch.");
        }
      }
    },
  },
});
