<script setup lang="ts">
import FormNetwork from 'components/homes/network/FormNetwork.vue';
import { ref } from 'vue';
import { useNetworkStore } from 'stores/network-store';
import { Network } from 'src/types/models/Network';
import { showSuccessToast } from 'vant';
import NetworkAPI from 'app/api/network';
import { formatMoneyToNumber } from 'src/util/formatter';

const networks = useNetworkStore()

const showSheet = defineModel<boolean>('showSheet', {
  type: Boolean,
  default: false
});
const formNetworkRef = ref<InstanceType<typeof FormNetwork> | null>()
const emit = defineEmits(['createNetwork'])

const form = ref<Network>({
  id: '',
  name: '',
  minBalance: '',
  maxBalance: '',
  maxMember: '',
  description: '',
  currency: ''
});

const resetForm = () => {
  form.value = {
    id: '',
    name: '',
    minBalance: '',
    maxBalance: '',
    maxMember: '',
    description: '',
    currency: '',
  };
}

const createNetwork = async () => {
  try {
    // convert 200,000 to 200000
    let formData = {
      ...form.value,
      minBalance: formatMoneyToNumber(form.value.minBalance),
      maxBalance: formatMoneyToNumber(form.value.maxBalance)
    };
    const response = await NetworkAPI.add(formData);
    networks.addNetwork(response.result as Network)
    showSuccessToast('Tạo mạng thành công')
    showSheet.value = false
    resetForm()
    emit('createNetwork')
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
