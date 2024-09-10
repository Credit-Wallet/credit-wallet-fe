<script setup>

import { ref } from 'vue';
import QRAddFriends from 'components/homes/network/QRAddFriends.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sheetQRAddFriends = ref(false);

const clickSheetQRJoin = () => {
  sheetQRAddFriends.value = true
}
</script>

<template>
  <div class="tw-mt-4 tw-flex tw-justify-around tw-flex-wrap">
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" @click="router.push('/home/create-transaction')">
        <q-icon name="swap_horiz" size="30px" />
      </van-button>
      <p class="tw-text-center">Tạo GD</p>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" :plain="true">
        <q-icon name="arrow_upward" size="30px" />
      </van-button>
      <p class="tw-text-center">Chuyển</p>
    </div>
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
      <van-button round class="icon-container-1" @click="clickSheetQRJoin">
        <q-icon name="person_add" size="30px" />
      </van-button>
      <p class="tw-text-center">Tham gia</p>
    </div>
  </div>

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
