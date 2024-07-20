<script setup lang="ts">
import walletImage from 'assets/images/wallet.jpeg';
import SheetCreatNetwork from 'components/homes/network/SheetCreatNetwork.vue';
import { ref } from 'vue';
// import { showConfirmDialog } from 'vant';

// interface Props {
//   modelValue: boolean
// }

// const props = defineProps<Props>()
// const emit = defineEmits(['update:modelValue'])

// const localShow = computed({
//   get: () => props.modelValue,
//   set: (value) => emit('update:modelValue', value)
// })
// const dialogWordPrivate = ref(false)
// const dialogConfirmWordPrivate = ref(false)
// const keyWordPrivateLeft = ['noble', 'inner']
// const keyWordPrivateRight = ['execute', 'pet']
// const keyword2 = ['noble', 'inner', 'execute', 'pet']
// const selectKeyword2 = ref('')

const showDialog = defineModel('showDialog', {
  type: Boolean,
  default: false
})
const sheetCreateNetwork = ref(false)

const createWallet = () => {
  // dialogWordPrivate.value = true
  // localShow.value = false
  sheetCreateNetwork.value = true
}

// const checkAnswerWordPrivate = () => {
//   showConfirmDialog({
//     title: 'Cụm từ bí mật',
//     message: 'Bạn đã nhập sai cụm từ bí mật, Vui lòng kiểm tra lại',
//     confirmButtonText: 'Thử lại',
//     cancelButtonText: 'Hủy'
//   })
//     .then(() => {
//       // on confirm
//     })
//     .catch(() => {
//       // on cancel
//     });
// }
</script>

<template>
  <van-dialog v-model:show="showDialog" title="Kết nối mạng" :show-confirm-button="false" show-cancel-button cancel-button-text="Hủy">
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
            @click = "createWallet"
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

  <sheet-creat-network v-model:showSheet="sheetCreateNetwork" />
<!--  <van-action-sheet v-model:show="dialogWordPrivate" title="Cụm từ bí mật" :show-confirm-button="false" show-cancel-button class="tw-h-[100vh]">-->
<!--    <template #default>-->
<!--      <div class="tw-px-4 tw-py-2">-->
<!--        <van-row justify="space-around" >-->
<!--          <van-col>-->
<!--            <div class="bg-grey-3 tw-h-10 tw-mt-2 tw-flex tw-items-center tw-rounded-sm" v-for="(item, index) in keyWordPrivateLeft" :key="index">-->
<!--              <span class="tw-m-4">{{ index + 1 }}. {{ item }}</span>-->
<!--            </div>-->
<!--          </van-col>-->
<!--          <van-col>-->
<!--            <div class="bg-grey-3 tw-h-10 tw-mt-2 tw-flex tw-items-center tw-rounded-sm" v-for="(item, index) in keyWordPrivateRight" :key="index">-->
<!--              <span class="tw-m-4">{{ index + 3 }}. {{ item }}</span>-->
<!--            </div>-->
<!--          </van-col>-->
<!--        </van-row>-->

<!--        <van-row justify="center" class="tw-mt-2">-->
<!--          <van-col>-->
<!--            <van-button class="tw-mb-4" plain>-->
<!--              <q-icon color="primary" name="content_copy" size="15px" />-->
<!--              <span class="tw-ml-2 tw-text-primary">Sao chép bộ nhớ tạm</span>-->
<!--            </van-button>-->
<!--          </van-col>-->
<!--        </van-row>-->
<!--      </div>-->
<!--    </template>-->

<!--    <template #cancel>-->
<!--      <van-row justify="center" class="tw-w-full">-->
<!--        <van-col span="24">-->
<!--          <van-button type="primary" block round @click="dialogConfirmWordPrivate = true">-->
<!--            <span class="text-weight-bold">Tiếp tục</span>-->
<!--          </van-button>-->
<!--        </van-col>-->
<!--      </van-row>-->
<!--    </template>-->
<!--  </van-action-sheet>-->

<!--  <van-action-sheet v-model:show="dialogConfirmWordPrivate" title="Xác nhận cụm từ bí mật" :show-confirm-button="false" show-cancel-button class="tw-h-[100vh]">-->
<!--    <template #default>-->
<!--      <div class="tw-px-4 tw-py-2 tw-h-full tw-flex tw-flex-col tw-justify-between">-->
<!--        <div>-->
<!--          <p>Vui lòng nhấn vào câu trả lời bên dưới cho các cụm từ ghi nhớ bên dưới</p>-->

<!--          <div>-->
<!--            <p class="tw-my-2">Từ #2</p>-->
<!--            <van-row gutter="20">-->
<!--              <van-radio-group direction="horizontal" v-model="selectKeyword2">-->
<!--                <van-radio v-for="(item, index) in keyword2" :key="index" :name="item">{{ item }}</van-radio>-->
<!--              </van-radio-group>-->
<!--            </van-row>-->
<!--          </div>-->
<!--        </div>-->

<!--        <van-row justify="center" class="tw-w-full">-->
<!--          <van-col span="24">-->
<!--            <van-button type="primary" block round @click="checkAnswerWordPrivate">-->
<!--              <span class="text-weight-bold">Xác nhận</span>-->
<!--            </van-button>-->
<!--          </van-col>-->
<!--        </van-row>-->
<!--      </div>-->
<!--    </template>-->
<!--  </van-action-sheet>-->
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
