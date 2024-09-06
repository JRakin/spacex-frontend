import { defineStore } from 'pinia'
import { apiClient } from '@/helper/helper';
import type { Launch, LaunchState } from '@/types/launch';

export const useLaunchStore = defineStore('launchStore', {
    state: (): LaunchState => ({
        launches: [] as Array<{ flight_number: number; name: string; date_utc: Date; _id: string }>,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAllLaunches() {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get<Launch[]>('launches/all');
                this.launches = response.data;
                console.log(this.launches)
            } catch (err) {
                this.error = 'Failed to fetch launches data';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async fetchSavedLaunches() {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get<Launch[]>('launches');
                this.launches = response.data;
                console.log(this.launches)
            } catch (err) {
                this.error = 'Failed to fetch launches data';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async addLaunch(launch: Launch) {
            try {
                const response = await apiClient.post<Launch>('/launches', launch);
            } catch (error) {
                console.error('Error adding launch:', error);
            }
        },

        async deleteLaunch(id: string) {
            try {
                const response = await apiClient.delete(`/launches/${id}`);
            } catch (error) {
                console.error('Error deleting launch:', error);
            }
        },
    },
});