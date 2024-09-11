<script setup lang="ts">
import { ref } from 'vue';
import CardNetwork from 'components/homes/network/CardNetwork.vue';
import CreateNetwork from 'components/homes/network/CreateNetwork.vue';
import { useNetworkStore } from 'stores/network-store';

const balance = ref(0)
const sheetWallet = ref(false)
const dialogCreateWallet = ref(false)
const networks = useNetworkStore()

console.log('networks 123:', networks.selectedNetwork);
</script>

<template>
  <div>
    <div class="tw-flex tw-items-center tw-justify-between">
      <div class="tw-flex tw-items-center tw-justify-between" @click="sheetWallet = true">
        <van-icon name="eye" class="icon tw-mr-2" size="30" />
        <span class="tw-text-lg tw-mr-1">{{ networks.selectedNetwork.name }}</span>
        <van-icon name="arrow-down" class="icon" size="13" />
      </div>

      <div>
        <span class="tw-text-2xl">{{ balance }} $</span>
      </div>
    </div>
  </div>

  <van-action-sheet v-model:show="sheetWallet" title="Mạng" class="tw-h-[100vh]">
    <template #default>
      <div class="tw-pl-4 tw-pr-4">
        <div class="tw-flex tw-items-center tw-justify-between">
          <span class="tw-text-lg">Danh sách mạng</span>

          <van-button round :plain="true">
            <q-icon name="add" size="30px" @click="dialogCreateWallet = true" />
          </van-button>
        </div>

        <div>
          <card-network @close-sheet-wallet="sheetWallet = false" />
        </div>
      </div>
    </template>
  </van-action-sheet>

  <create-network v-model:showDialog="dialogCreateWallet" />
</template>

<style scoped lang="scss">
.icon-container-1 {
  height: 50px;
  width: 50px;
  background-color: #f5f5f5; /* Change the background color as needed */
}
:deep(.van-button--default) {
  border: none !important;
}
:deep(.van-card__thumb) {
  width: 50px;
  height: 50px;
}
:deep(.van-card__header) {
  height: 60px;
}
:deep(.van-card__thumb) {
  display: flex;
  align-items: center;
}
:deep(.van-card__content) {
  min-height: 70px;
}
:deep(.van-card__bottom) {
  margin-bottom: 4px;
}
</style>
