<script setup lang="ts">
import FormNetwork from 'components/homes/network/FormNetwork.vue';
import { ref } from 'vue';
import { useNetworkStore } from 'stores/network-store';
import { Network } from 'src/types/models/Network';
import { showSuccessToast } from 'vant';

const networks = useNetworkStore()

const showSheet = defineModel<boolean>('showSheet', {
  type: Boolean,
  default: false
});
const formNetworkRef = ref<InstanceType<typeof FormNetwork> | null>()

const form = ref<Network>({
  name: '',
  maxRedundancy: '',
  maxDebt: '',
  maxMember: '',
  typeMoney: '',
});

const resetForm = () => {
  form.value = {
    name: '',
    maxRedundancy: '',
    maxDebt: '',
    maxMember: '',
    typeMoney: '',
  };
}

const createNetwork = () => {
  networks.addNetwork(form.value)
  showSuccessToast('Tạo mạng thành công')
  showSheet.value = false
  resetForm()
}
</script>

<template>
  <van-action-sheet v-model:show="showSheet" title="Tạo mạng mới" :show-confirm-button="false" show-cancel-button class="tw-h-[100vh]">
    <template #default>
      <div>
        <form-network ref="formNetworkRef" :form="form" />
      </div>
    </template>

    <template #cancel>
      <van-row justify="center" class="tw-w-full">
        <van-col span="24">
          <van-button type="primary" block round @click="createNetwork">
            <span class="text-weight-bold">Tạo</span>
          </van-button>
        </van-col>
      </van-row>
    </template>
  </van-action-sheet>
</template>

<style scoped>

</style>
