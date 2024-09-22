<script setup lang="ts">

import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'MainLayout'
});

const { t } = useI18n()
const active = ref(0)
const title = computed(
  () => {
    switch (active.value) {
      case 0:
        return t('home.title');
      case 1:
        return t('history.title');
      case 2:
        return t('scan.title');
      case 3:
        return t('notification.title');
      case 4:
        return t('user.title');
      default:
        return t('home.title');
    }
  }
)
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal>
      <van-nav-bar
        :title="title"
        class="bg-gradient"
        :border="false"
      />
    </q-header>

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>

    <q-footer>
      <van-tabbar reveal v-model="active">
        <van-tabbar-item icon="home-o" @click="$router.push('/')">{{ $t('home.title') }}</van-tabbar-item>
        <van-tabbar-item icon="notes-o" @click="$router.push('/history')">{{ $t('history.title') }}</van-tabbar-item>
        <van-tabbar-item icon="qr" @click="$router.push('/scan')">{{ $t('scan.title') }}</van-tabbar-item>
        <van-tabbar-item icon="bell" @click="$router.push('/notification')">{{ $t('notification.title') }}
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" @click="$router.push('/user')">{{ $t('user.title') }}</van-tabbar-item>
      </van-tabbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
:deep(.q-layout__section--marginal) {
  background-color: transparent !important;
}
.bg-gradient {
  background: linear-gradient(to right, rgba(142, 45, 226, 0.8), rgba(74, 0, 224, 0.8));
}
</style>
