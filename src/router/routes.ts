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
    path: '/history/bill/:id',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Chi tiết yêu cầu', buttonRight: false },
    children: [{ path: '', component: () => import('components/histories/DetailBill.vue'), meta: { requiresAuth: true }}],
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
    path: '/notification/bill_request/:id',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Chi tiết yêu cầu thanh toán', buttonRight: false },
    children: [{ path: '', component: () => import('components/notifications/DetailBillRequest.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/user/UserPage.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/user/profile',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Hồ sơ', buttonRight: false },
    children: [{ path: '', component: () => import('components/user/ProfileUser.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/user/settings',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Cài đặt', buttonRight: false },
    children: [{ path: '', component: () => import('components/user/SettingUser.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthenLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue')}],
  },
  {
    path: '/home/create-transaction',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Chọn người', buttonRight: false },
    children: [{ path: '', component: () => import('pages/home/transaction/CreateTransaction.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/home/confirm-transaction',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Xác nhận', buttonRight: false },
    children: [{ path: '', component: () => import('pages/home/transaction/ConfirmTransaction.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/home/finish-transaction',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Thành công', buttonLeft: false, rightText: 'Trang chủ', rightPath: '/'},
    children: [{ path: '', component: () => import('pages/home/transaction/FinishTransaction.vue'), meta: { requiresAuth: true }}],
  },
  {
    path:  '/home/networks/:uuid/join',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Tham gia nhóm', buttonLeft: false, buttonRight: false },
    children: [{ path: '', component: () => import('pages/home/NetworkJoin.vue'), meta: { requiresAuth: true }}],
  },
  {
    path: '/home/send-money',
    component: () => import('layouts/NavbarLayout.vue'),
    props: { title: 'Chuyển tiền', buttonRight: false },
    children: [{ path: '', component: () => import('pages/home/send-money/SendMoney.vue'), meta: { requiresAuth: true }}],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
