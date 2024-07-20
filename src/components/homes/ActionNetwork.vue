<script setup lang="ts">

import { ref } from 'vue';
import QRAddFriends from 'components/homes/network/QRAddFriends.vue';
import CreatePayment from 'components/homes/transition/CreatePayment.vue';

const sheetCreatePayment = ref(false);
const sheetQRAddFriends = ref(false);
</script>

<template>
  <div class="tw-mt-4 tw-flex tw-justify-around tw-flex-wrap">
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" @click="sheetCreatePayment = true">
        <q-icon name="swap_horiz" size="30px" />
      </van-button>
      <p class="tw-text-center">Tạo GD</p>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" :plain="true">
        <q-icon name="arrow_upward" size="30px" />
      </van-button>
      <p class="tw-text-center">Bán</p>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1">
        <q-icon name="arrow_downward" size="30px" />
      </van-button>
      <p class="tw-text-center">Nhận</p>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" @click="sheetQRAddFriends = true">
        <q-icon name="person_add" size="30px" />
      </van-button>
      <p class="tw-text-center">Thêm bạn</p>
    </div>
  </div>

  <create-payment v-model="sheetCreatePayment" />
  <q-r-add-friends v-model="sheetQRAddFriends" />
</template>

<style scoped>
.icon-container-1 {
  height: 50px;
  width: 50px;
  background-color: #f5f5f5; /* Change the background color as needed */
}
:deep(.van-button--default) {
  border: none !important;
}
</style>
