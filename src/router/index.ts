import { createMemoryHistory, createRouter } from 'vue-router'
import Launches from '@/views/Launches.vue';

const routes = [
  { path: '/',  name: 'Launches', component: Launches },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;