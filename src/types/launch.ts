export interface Launch {
    _id: string,
    flight_number: number;
    name: string;
    date_utc: Date;
}

export interface LaunchState {
    launches: Launch[];
    loading: boolean;
    error: string | null;
}