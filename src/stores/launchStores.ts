import { defineStore } from 'pinia'
import { apiClient } from '@/helper/helper';

export interface Launch {
    flight_number: number;
    name: string;
    date_utc: Date;
}

export interface LaunchState {
    launches: Launch[];
    loading: boolean;
    error: string | null;
}


export const useLaunchStore = defineStore('launchStore', {
    state: (): LaunchState => ({
        launches: [] as Array<{ flight_number: number; name: string; date_utc: Date; }>,
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
    },
});