<script setup lang="ts">
import shield from 'assets/images/shield.jpg';
import { ref } from 'vue';
import SheetCreatNetwork from 'components/homes/network/SheetCreatNetwork.vue';

const sheetCreateNetwork = ref(false);
</script>

<template>
  <van-row justify="center">
    <van-col>
      <van-image :src="shield" width="100" height="100"/>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="24">
      <van-card
        class="tw-rounded-xl tw-h-[64px]"
        desc="Cụm từ bí mật hoặc ví Swift"
        @click="sheetCreateNetwork = true"
      >
        <template #title>
          <span class="tw-text-base text-weight-bold">Tạo một mạng mới</span>
        </template>

        <template #thumb>
          <van-button round class="icon-container-1" :plain="true">
            <q-icon name="add" size="30px" color="primary" />
          </van-button>
        </template>
      </van-card>
    </van-col>
  </van-row>

  <van-row class="tw-my-2">
    <van-col span="24">
      <van-card
        class="tw-rounded-xl card-create-wallet tw-h-[64px]"
        desc="Nhập, khôi phục"
      >
        <template #title>
          <span class="tw-text-base text-weight-bold">Thêm mạng hiện có</span>
        </template>

        <template #thumb>
          <van-button round class="icon-container-1" :plain="true">
            <q-icon name="add" size="30px" color="primary" />
          </van-button>
        </template>
      </van-card>
    </van-col>
  </van-row>

  <sheet-creat-network v-model:showSheet="sheetCreateNetwork" />
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
:deep(.van-card__thumb) {
  width: 50px;
  height: 50px;
}
:deep(.van-card__header) {
  height: 60px;
}
:deep(.van-card__thumb) {
  display: flex;
  align-items: center;
}
:deep(.van-card__content) {
  min-height: 70px;
}
:deep(.van-card__bottom) {
  margin-bottom: 4px;
}
</style>
