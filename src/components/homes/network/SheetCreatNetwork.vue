<script setup lang="ts">
import FormNetwork from 'components/homes/network/FormNetwork.vue';
import { ref } from 'vue';
import { useNetworkStore } from 'stores/network-store';
import { Network } from 'src/types/models/Network';
import { showSuccessToast } from 'vant';
import NetworkAPI from 'app/api/network';

const networks = useNetworkStore()

const showSheet = defineModel<boolean>('showSheet', {
  type: Boolean,
  default: false
});
const formNetworkRef = ref<InstanceType<typeof FormNetwork> | null>()

const form = ref<Network>({
  id: '',
  name: '',
  maxRedundancy: '',
  maxDebt: '',
  maxMember: '',
  typeMoney: '',
});

const resetForm = () => {
  form.value = {
    id: '',
    name: '',
    maxRedundancy: '',
    maxDebt: '',
    maxMember: '',
    typeMoney: '',
  };
}

const createNetwork = async () => {
  try {
    const response = await NetworkAPI.add(form.value);
    networks.addNetwork(response.result as Network)
    showSuccessToast('Tạo mạng thành công')
    showSheet.value = false
    resetForm()
  } catch (error) {
    console.log('Create network failed:', error);
  }
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
