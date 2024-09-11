<script setup lang="ts">
import { ref } from 'vue';

const link = ref('http://localhost:8080/transaction/123456');
</script>

<template>
    <div class="van-card tw-m-4">
      <div class="tw-flex tw-flex-col tw-items-center">
        <van-icon name="success" color="#4CAF50" size="80" />
        <h2 class="tw-text-base">Gửi yêu cầu chia tiền thành công</h2>
      </div>

      <div class="tw-flex tw-justify-around tw-mt-2">
        <van-button type="default">Hủy yêu cầu</van-button>
        <van-button type="primary" to="/">Về trang chủ</van-button>
      </div>

      <div class="tw-mt-4">
        <p>Nhắc nhở qua kênh khác</p>
        <div class="tw-flex">
          <van-field readonly v-model="link" class="tw-mr-2" />
          <van-button type="primary">Gửi link</van-button>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>
