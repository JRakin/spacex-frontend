import { createRouter, createWebHistory } from "vue-router";
import Launches from "@/pages/Launches.vue";
import SavedLaunches from "@/pages/SavedLaunches.vue";

const routes = [
  { path: "/", name: "Launches", component: Launches },
  { path: "/saved-launches", name: "SavedLaunches", component: SavedLaunches },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
