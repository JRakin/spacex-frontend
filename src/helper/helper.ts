import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

if (!baseURL) {
  throw new Error("VITE_BASE_URL is not defined in environment variables");
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});

export const convertDate = (isoDate: Date) => {
  const date = new Date(isoDate);

  const year = date.getUTCFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getUTCDate();
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });

  return `${weekday}, ${month} ${day} ${year}`;
};
