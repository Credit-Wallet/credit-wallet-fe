<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'HistoryPage'
});

const drawer = ref(false);
const items = ref([
  { id: 1, name: 'Item 1', description: 'Description 1', date: '2021-10-01' },
  { id: 2, name: 'Item 2', description: 'Description 2', date: '2021-10-02' },
  { id: 3, name: 'Item 3', description: 'Description 3', date: '2021-10-03' },
  { id: 4, name: 'Item 4', description: 'Description 4', date: '2021-10-04' },
  { id: 5, name: 'Item 5', description: 'Description 5', date: '2021-10-05' },
]);
</script>

<template>
  <q-page>
    <q-page-sticky position="top">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawer = true" />
        <q-toolbar-title>
          {{ $t('history.title') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>

    <q-page-container>
      <q-list>
        <q-item v-for="item in items" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ item.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ item.date }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </q-page>
</template>

<style scoped>

</style>
