<script setup lang="ts">
import { ref } from 'vue';
import Wallet from 'components/homes/CardWallet.vue';
import walletImage from 'assets/images/wallet.jpeg';

const balance = ref(0)
const sheetWallet = ref(false)
const dialogCreateWallet = ref(false)
</script>

<template>
  <div>
    <div class="tw-flex tw-items-center tw-justify-between">
      <div class="tw-flex tw-items-center tw-justify-between" @click="sheetWallet = true">
        <van-icon name="eye" class="icon tw-mr-2" size="30" />
        <span class="tw-text-lg tw-mr-1">{{ $t('home.wallet.primaryWallet') }}</span>
        <van-icon name="arrow-down" class="icon" size="13" />
      </div>

      <div>
        <span class="tw-text-2xl">{{ balance }} $</span>
      </div>
    </div>

    <div class="row tw-mt-4">
      <div class="col tw-flex tw-justify-center">
        <van-button round class="icon-container-1" :plain="true">
          <q-icon name="arrow_upward" size="30px" />
        </van-button>
      </div>
      <div class="col tw-flex tw-justify-center">
        <van-button round class="icon-container-1">
          <q-icon name="arrow_downward" size="30px" />
        </van-button>
      </div>
      <div class="col tw-flex tw-justify-center">
        <van-button round class="icon-container-1">
          <q-icon name="swap_horiz" size="30px" />
        </van-button>
      </div>
      <div class="col tw-flex tw-justify-center">
        <van-button round class="icon-container-1">
          <q-icon name="person_add" size="30px" />
        </van-button>
      </div>
    </div>
  </div>

  <van-action-sheet v-model:show="sheetWallet" title="Ví" class="tw-h-[100vh]">
    <template #default>
      <div class="tw-pl-4 tw-pr-4">
        <div class="tw-flex tw-items-center tw-justify-between">
          <span class="tw-text-lg">Danh sách ví</span>

          <van-button round :plain="true">
            <q-icon name="add" size="30px" @click="dialogCreateWallet = true" />
          </van-button>
        </div>

        <div>
          <wallet />
        </div>
      </div>
    </template>
  </van-action-sheet>

  <van-dialog v-model:show="dialogCreateWallet" title="Kết nối ví" :show-confirm-button="false" show-cancel-button cancel-button-text="Hủy">
    <template #default>
      <van-row justify="center" class="tw-my-4">
        <van-col span="6">
          <van-image :src="walletImage" width="100" height="100" class="tw-ml-[-12px]"/>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="24" class="tw-px-4">
          <van-card
            class="tw-rounded-xl tw-h-[64px]"
            desc="Cụm từ bí mật hoặc ví Swift"
          >
            <template #title>
              <span class="tw-text-base text-weight-bold">Tạo một ví mới</span>
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
        <van-col span="24" class="tw-px-4">
          <van-card
            class="tw-rounded-xl card-create-wallet tw-h-[64px]"
            desc="Nhập, khôi phục"
          >
            <template #title>
              <span class="tw-text-base text-weight-bold">Thêm ví hiện có</span>
            </template>

            <template #thumb>
              <van-button round class="icon-container-1" :plain="true">
                <q-icon name="add" size="30px" color="primary" />
              </van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
    </template>
  </van-dialog>
</template>

<style scoped lang="scss">
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
