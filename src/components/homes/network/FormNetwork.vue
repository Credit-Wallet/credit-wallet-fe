<script setup lang="ts">
import { Network } from 'src/types/models/Network';
import { ref } from 'vue';
import { FormInstance } from 'vant';
import { formatMoneyVant } from 'src/util/formatter';

const form = defineModel('form', {
  type: Object,
  default: {
    id: '',
    name: '',
    minBalance: '',
    maxBalance: '',
    maxMember: '',
    currency: '',
    description: ''
  } as Network,
});
const showPickerCurrency = ref(false);
const moneies = ref([
  { text: 'VND', value: 'VND' },
  { text: 'USD', value: 'USD' },
  { text: 'EUR', value: 'EUR' },
]);
const vanFormRef = ref<FormInstance | null>();

const onSubmit = () => {
  console.log('form', form.value);
}

const onConfirm = ({ selectedOptions }: { selectedOptions: { text: string }[] }) => {
  form.value.currency = selectedOptions[0]?.text;
  showPickerCurrency.value = false;
};

defineExpose({
  onSubmit
});
</script>

<template>
  <van-form ref="vanFormRef">
    <van-cell-group inset>
      <van-field
        v-model="form.name"
        name="Tên"
        label="Tên"
        placeholder="Tên"
        clearable
        :rules="[{ required: true, message: 'Tên là bắt buộc' }]"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field
        v-model="form.description"
        name="Mô tả"
        label="Mô tả"
        placeholder="Mô tả"
        clearable
        :rules="[{ required: true, message: 'Mô tả là bắt buộc' }]"
      />
    </van-cell-group>
    <van-divider />
    <van-cell-group inset>
      <van-field
        v-model="form.maxBalance"
        name="Tối đa dư"
        label="Tối đa dư"
        placeholder="Tối đa dư"
        type="number"
        clearable
        :rules="[{ required: true, message: 'Tối đa dư là bắt buộc' }]"
        :formatter="formatMoneyVant"
      />
    </van-cell-group>
    <van-divider />
    <van-cell-group inset>
      <van-field
        v-model="form.minBalance"
        name="Tối đa nợ"
        label="Tối đa nợ"
        placeholder="Tối đa nợ"
        type="number"
        :formatter="formatMoneyVant"
        clearable
        :rules="[{ required: true, message: 'Tối đa nợ là bắt buộc' }]"
      />
    </van-cell-group>
    <van-divider />
    <van-cell-group inset>
      <van-field
        v-model="form.maxMember"
        name="Tối đa thành viên"
        label="Tối đa thành viên"
        placeholder="Tối đa thành viên"
        type="number"
        clearable
        :rules="[{ required: true, message: 'Tối đa thành viên là bắt buộc' }]"
      />
    </van-cell-group>
    <van-divider />
    <van-cell-group inset>
      <van-field
        v-model="form.currency"
        is-link
        readonly
        name="Loại tiền"
        label="Loại tiền"
        placeholder="Chọn loại tiền"
        @click="showPickerCurrency = true"
        :rules="[{ required: true, message: 'Loại tiền là bắt buộc' }]"
      />
    </van-cell-group>
  </van-form>

  <van-popup v-model:show="showPickerCurrency" position="bottom" clo>
    <van-picker
      :columns="moneies"
      @confirm="onConfirm"
      @cancel="showPickerCurrency = false"
    />
  </van-popup>
</template>

<style scoped>
:deep(.van-divider) {
  margin: 0;
}
</style>
