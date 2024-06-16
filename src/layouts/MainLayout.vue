<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="tw-bg-white">
      <q-toolbar class="flex tw-w-full tw-text-center tw-items-center tw-text-black tw-justify-center">
        <template #default>
          <span class="text-h6">{{ title }}</span>
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>

    <q-footer>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="$router.push('/')">{{ $t('home.title') }}</van-tabbar-item>
        <van-tabbar-item icon="notes-o" @click="$router.push('/history')">{{ $t('history.title') }}</van-tabbar-item>
        <van-tabbar-item icon="qr" @click="$router.push('/scan')">{{ $t('scan.title') }}</van-tabbar-item>
        <van-tabbar-item icon="bell" @click="$router.push('/notification')">{{ $t('notification.title') }}
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" @click="$router.push('/user')">{{ $t('user.title') }}</van-tabbar-item>
      </van-tabbar>
    </q-footer>
    s

  </q-layout>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'MainLayout'
});

const active = ref(0);
const title = ref('');
const { t } = useI18n()

watch(
  () => active.value,
  (value) => {
    switch (value) {
      case 0:
        title.value = t('home.title');
        break;
      case 1:
        title.value = t('history.title');
        break;
      case 2:
        title.value = t('scan.title');
        break;
      case 3:
        title.value = t('notification.title');
        break;
      case 4:
        title.value = t('user.title');
        break;
    }
  }
)
</script>
