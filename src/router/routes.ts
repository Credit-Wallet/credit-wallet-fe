import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/home/HomePage.vue') }],
  },
  {
    path: '/history',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/history/HistoryPage.vue') }],
  },
  {
    path: '/scan',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/scan/ScanPage.vue') }],
  },
  {
    path: '/notification',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/notification/NotificationPage.vue') }],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/user/UserPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthenLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
