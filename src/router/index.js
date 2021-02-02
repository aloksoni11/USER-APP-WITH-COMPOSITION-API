import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'user-app',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserApp.vue'),
  },
  {
    path: '/invoice',
    name: 'invoice-app',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/InvoiceList.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

export default router;
