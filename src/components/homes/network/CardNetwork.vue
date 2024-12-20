<script setup>
import { ref } from 'vue';
import FormWallet from 'components/homes/network/FormNetwork.vue';
import { useNetworkStore } from 'stores/network-store';
import AccountAPI from 'app/api/account';
import NetworkAPI from 'app/api/network';
import { showFailToast, showSuccessToast } from 'vant';

const emit = defineEmits(['closeSheetWallet'])
const dialogEditWallet = ref(false)
const networks = useNetworkStore()
const dialogDeleteWallet = ref(false)
const outNetWorkId = ref(null)

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

const outNetwork = async () => {
  await NetworkAPI.outNetwork().then(() => {
    networks.outNetwork(outNetWorkId.value)
    showSuccessToast('Rời khỏi nhóm thành công')
    outNetWorkId.value = null
    if (networks.networks.length > 0) {
      selectNetwork(networks.networks[0])
    }
  }).catch(() => {
    showFailToast('Rời khỏi nhóm thất bại! Khi rời nhóm ví phải là 0')
  });
}

const clickOutNetwork = (networkId) => {
  outNetWorkId.value = networkId
  dialogDeleteWallet.value = true
}
</script>

<template>
  <div>
    <van-card
      class="tw-rounded-xl"
      title="Ví chính"
      :desc="network.id === networks.selectedNetwork.id ? 'Đang chọn' : ''"
      v-for="(network, index) in networks.networks"
      :key="index"
      @click="selectNetwork(network)"
    >
      <template #title>
        <div class="tw-flex tw-justify-between">
          <span class="tw-text-base text-weight-bold">{{ network.name }}</span>
          <div>
            <q-icon class="tw-mr-2" name="edit" size="20px" @click.stop="dialogEditWallet = true" />
            <q-icon name="delete" size="20px" @click.stop="clickOutNetwork(network.id)" v-if="network.id === networks.selectedNetwork.id" />
          </div>
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
      <span class="tw-text-base text-weight-bold">Chỉnh sửa nhóm</span>
    </template>

    <template #default>
      <form-wallet />
    </template>
  </van-dialog>

  <van-dialog v-model:show="dialogDeleteWallet" :show-cancel-button="true" :show-confirm-button="true" cancel-button-text="Hủy" confirm-button-text="Xác nhận" @confirm="outNetwork">
    <template #title>
      <span class="tw-text-base text-weight-bold">Rời khỏi nhóm</span>
    </template>

    <template #default>
      <div class="tw-p-4">
        <span>Bạn có chắc chắn muốn rời khỏi nhóm này?</span>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped>

</style>
