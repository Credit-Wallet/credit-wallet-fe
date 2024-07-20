<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['submit']);

const name = ref('');
const balance = ref('');
const formRef = ref();

const onFailed = (error: Error) => {
  console.log(error);
};

const submit = () => {
  formRef.value?.submit();

  if (name.value && balance.value) {
    emits('submit', true);
  }
};

defineExpose({ submit });
</script>

<template>
  <van-form ref="formRef" @failed="onFailed">
    <van-cell-group inset>
      <van-field
        v-model="name"
        name="name"
        label="Tên"
        placeholder="Tên"
        :rules="[{ required: true, message: 'Tên là bắt buộc' }]"
      />
      <van-field
        v-model="balance"
        type="number"
        name="Số tiền"
        label="Số tiền"
        placeholder="Số tiền"
        :rules="[{ required: true, message: 'Số tiền là bắt buộc' }]"
      />
      <van-field name="radio" label="Radio">
        <template #input>
          <van-radio-group direction="horizontal">
            <van-radio name="1">Chia đều cho tất cả thành viên</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
  </van-form>
</template>

<style scoped>
.submit {
  display: none;
}
</style>
