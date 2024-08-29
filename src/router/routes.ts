import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/HomePage.vue'), meta: { requiresAuth: true }},
    ],
  },
  {
    path: '/history',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/history/HistoryPage.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/scan',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/scan/ScanPage.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/notification',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/notification/NotificationPage.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/user/UserPage.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthenLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue')}],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
