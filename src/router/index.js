import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/HomePage.vue";

const routes =  [
    {
        path: '/:lang?',
        name: 'home',
        component: HomePage,
      // props: (route) => ({ initialLanguage: route.params.lang || 'en' }),
        props:true
    },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router
