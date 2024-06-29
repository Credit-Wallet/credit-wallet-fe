<script setup lang="ts">

import SelectWallet from 'components/homes/SelectWallet.vue';

defineOptions({
  name: 'HomePage'
});

</script>

<template>
  <q-page>
    <van-search
      shape="round"
      placeholder="Placeholder"
    />

    <div class="tw-p-4">
      <select-wallet />
    </div>
  </q-page>
</template>

<style scoped>
:deep(.van-search) {
  padding: 16px 16px 0 16px !important;
}
</style>
