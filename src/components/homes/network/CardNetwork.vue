<script setup>
import { ref } from 'vue';
import FormWallet from 'components/homes/network/FormNetwork.vue';
import { useNetworkStore } from 'stores/network-store';
import AccountAPI from 'app/api/account';

const emit = defineEmits(['closeSheetWallet'])
const dialogEditWallet = ref(false)
const networks = useNetworkStore()

const selectNetwork = async (network) => {
  console.log('Select network:', network);
  await AccountAPI.selectedNetwork(network.id).then(() => {
    networks.selectNetwork(network)
    emit('closeSheetWallet')
  }).catch((error) => {
    console.log('Select network failed:', error);
  });

  await AccountAPI.getAccountsByNetworkId({ networkId: network.id }).then((response) => {
    networks.resetMembers();
    networks.addMembers(response.result);
  }).catch((error) => {
    console.log('Fetch networks failed:', error);
  });
}
</script>

<template>
  <div>
    <van-card
      class="tw-rounded-xl"
      title="Ví chính"
      desc="Đây là ví chính"
      v-for="(network, index) in networks.networks"
      :key="index"
      @click="selectNetwork(network)"
    >
      <template #title>
        <div class="tw-flex tw-justify-between">
          <span class="tw-text-base text-weight-bold">{{ network.name }}</span>
          <q-icon name="edit" size="20px" @click.stop="dialogEditWallet = true" />
        </div>
      </template>

      <template #thumb>
        <q-icon name="paid" class="icon" size="40px" color="primary" />
      </template>

      <template #bottom>
        <span class="tw-text-sm text-primary">Sao lưu</span>
      </template>
    </van-card>
  </div>

  <van-dialog v-model:show="dialogEditWallet" title="Chỉnh sửa ví" :show-cancel-button="true" :show-confirm-button="true" cancel-button-text="Hủy" confirm-button-text="Lưu" >
    <template #title>
      <span class="tw-text-base text-weight-bold">Chỉnh sửa mạng</span>
    </template>

    <template #default>
      <form-wallet />
    </template>
  </van-dialog>
</template>

<style scoped>

</style>
