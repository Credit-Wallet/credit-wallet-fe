<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ScanPage'
});

const drawer = ref(false);
</script>

<template>
  <q-page-container class="bg-grey-3">
    <q-page>
      <q-page-sticky position="top">
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawer = true" />
          <q-toolbar-title>
            {{ $t('notification.title') }}
          </q-toolbar-title>
        </q-toolbar>
      </q-page-sticky>

      <q-page-container>
        <q-card>
          <q-card-section>
            <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" />
          </q-card-section>
          <q-card-section>
            <q-btn label="Notification" color="primary" />
          </q-card-section>
        </q-card>
      </q-page-container>
    </q-page>
  </q-page-container>
</template>

<style scoped>

</style>
