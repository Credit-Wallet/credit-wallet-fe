<script setup lang="ts">
import { ref } from 'vue';
import ListBill from 'components/histories/ListBill.vue';
import ListTransaction from 'components/histories/ListTransaction.vue';

defineOptions({
  name: 'HistoryPage'
});

const active = ref(0);
</script>

<template>
  <q-page>
    <van-tabs v-model:active="active">
      <van-tab :title="'Yêu cầu'">
        <template #default>
            <list-bill />
        </template>
      </van-tab>
      <van-tab :title="'Giao dịch'">
        <template #default>
            <list-transaction />
        </template>
      </van-tab>
    </van-tabs>
  </q-page>
</template>

<style scoped>

</style>
