import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/views/user/HomePage.vue";
import Dashboard from "@/views/admin/Dashboard.vue";

const routes = [
    {
        path: '/admin',
        component: Dashboard,
        meta: { requiresAuth: true, admin: true },
        children: [
            {
                path: 'blogs',
                name: 'admin-blogs',
                component: import('@/components/admin/Blogs.vue'),
                props: true,
            },
            {
                path: 'services',
                name: 'admin-services',
                component: import('@/components/admin/Service.vue'),
                props: true,
            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        props: true
        // props: (route) => ({
        //     initialLanguage: route.params.lang
        // })
    },
    {
        path: '/:lang?',
        name: 'home',
        component: HomePage,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
