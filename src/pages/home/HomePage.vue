<script setup lang="ts">
import SelectNetwork from 'components/homes/SelectNetwork.vue';
import ActionNetwork from 'components/homes/ActionNetwork.vue';
import EmptyNetwork from 'components/homes/EmptyNetwork.vue';
import { useNetworkStore } from 'stores/network-store';

defineOptions({
  name: 'HomePage'
});

const networks = useNetworkStore()
</script>

<template>
  <q-page>
    <div v-if="networks.networkCount === 0" class="tw-p-4">
      <EmptyNetwork />
    </div>

    <div v-else>
      <van-search
        shape="round"
        placeholder="Tìm kiếm"
      />

      <div class="tw-p-4">
        <SelectNetwork />

        <ActionNetwork />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
:deep(.van-search) {
  padding: 16px 16px 0 16px !important;
}
</style>
