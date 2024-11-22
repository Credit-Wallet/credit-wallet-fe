<script setup>
import { useTransactionStore } from 'stores/transaction-store';
import { CheckboxGroup, showFailToast, showToast } from 'vant';
import avatar from 'assets/images/avatar.jpeg';
import { ref } from 'vue';
import { formatMoney } from 'src/util/formatter';
import DialogUpdateMoney from 'components/homes/transition/DialogUpdateMoney.vue';
import BillAPI from 'app/api/bill';
import { useRouter } from 'vue-router';

const showDialogUpdateMoney = ref(false);
const memberUpdateMoney = ref(null);
const description = ref(null);
const router = useRouter();
const baseUrl = process.env.backend_url;

const transaction = useTransactionStore();
const totalMoney = ref(transaction.getMoney);
const memberList = ref([
  ...transaction.getMembers
]);

// Handles the selected users
const selectedMembers = ref([
  ...transaction.members.map((member) => member.id)
]);

const note = ref([
  'tiền trả sữa',
  'tiền cơm trưa',
  'tiền nhậu',
  'tiền bún bò'
]);
const formDescription = ref(null);

const addNote = (note) => {
  description.value = note;
};

const updateMoney = (member) => {
  memberUpdateMoney.value = member;
  console.log('Update money:', memberUpdateMoney.value);
  showDialogUpdateMoney.value = true;
};

const updateMoneySuccess = (member) => {
  transaction.recalculateMoneyWhenUpdateMoneyMember(member.money, member.id);
  memberList.value = [
    ...transaction.getMembers
  ];
  showDialogUpdateMoney.value = false;
};

const updateSelectMember = (member) => {
  const result = transaction.recalculateMoneyWhenUpdateSelectedMember(member.id);
  console.log('Result:', result);
  if (result) {
    memberList.value = [
      ...transaction.getMembers
    ];
  } else {
    memberList.value.map((item) => {
      if (item.id === member.id) {
        item.selected = true;
      }
    });
    showFailToast('Thay đổi ảnh hưởng đến tổng tiền');
  }
  memberList.value = [
    ...transaction.getMembers
  ];
};

const rules = {
  description: [
    {
      required: true,
      message: 'Mô tả là bắt buộc',
    },
  ],
};

const createTransaction = async () => {
  formDescription.value.validate().then( async () => {
    transaction.setDescription(description.value);
    console.log('Create transaction');
    const dataBill = {
      amount: transaction.getMoney,
      name: transaction.getDescription,
      networkId: transaction.getNetworkId,
      billRequests: transaction.getMembers.map((member) => {
        if (member.selected) {
          return {
            accountId: member.id,
            amount: member.money
          }
        }
      })
    };
    await BillAPI.createBill(dataBill).then((response) => {
      console.log('Create dataBill success:', response);
      router.push('/home/finish-transaction');
    }).catch((error) => {
      console.log('Create transaction failed:', error);
      showToast('Gửi yêu cầu thất bại')
    });
  }).catch(() => {
    showToast('Mô tả là bắt buộc');
  });
};
</script>

<template>
  <div class="tw-mx-3">
    <div class="van-card">
      <div class="van-card__content">
        <div class="tw-flex tw-justify-between">
          <p class="tw-text-base">Tổng tiền</p>
          <p class="tw-ml-2 tw-text-red-500 tw-text-base">{{ formatMoney(transaction.money) }}</p>
        </div>
        <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa'}" />
<!--    Mô tả    -->
        <div>
          <van-form :rules="rules" ref="formDescription">
            <van-field
              v-model="description"
              label="Mô tả"
              placeholder="Nhập mô tả"
              clearable
              autosize
              required
              :rules="rules.description"
            />
          </van-form>
        </div>

        <!-- Buttons (suggestions) -->
        <div class="tw-my-3 tw-flex tw-space-x-2">
          <van-tag type="primary" size="medium" v-for="(item, index) in note" :key="index" @click="addNote(item)">{{ item }}</van-tag>
        </div>

        <div>
          <p class="tw-text-base">Danh sách ({{ memberList.length }})</p>
          <CheckboxGroup v-model="selectedMembers" direction="vertical" class="tw-max-h-[60vh] tw-overflow-y-auto">
            <div v-for="(member) in memberList" :key="member.id" class="tw-flex tw-justify-between tw-items-center tw-py-2">
              <div class="tw-flex tw-items-center">
                <van-checkbox :name="member.id" @click="updateSelectMember(member)" />
                <van-image
                  round
                  width="40px"
                  height="40px"
                  :src="member.avatar ? baseUrl + member.avatar : avatar"
                  class="tw-mx-4"
                />
                <div>
                  <p class="tw-truncate">{{ member.username }} <span v-if="member.isSelf">(Tôi)</span></p>
                  <p v-if="member.email" class="tw-text-xs tw-text-gray-500 tw-truncate tw-w-[120px]">{{ member.email }}</p>
                </div>
              </div>
              <p v-if="member.updateMoney" class="tw-text-base tw-underline cursor-pointer tw-text-primary" @click="updateMoney(member)">{{ formatMoney(member.money) }}</p>
              <p v-else class="tw-text-base tw-underline cursor-pointer" @click="updateMoney(member)">{{ formatMoney(member.money) }}</p>
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </div>


    <div class="van-action-sheet__gap"></div>

    <div class="sticky-bottom-btn">
      <van-button type="primary" round class="tw-w-full" @click="createTransaction">Gửi yêu cầu</van-button>
    </div>

    <dialog-update-money
      v-if="showDialogUpdateMoney"
      v-model:show="showDialogUpdateMoney"
      :total-money="totalMoney"
      :member-update-money="memberUpdateMoney"
      @update-money-success="updateMoneySuccess"
      @update:show-dialog="showDialogUpdateMoney = $event"
    />
  </div>
</template>

<style scoped>
.sticky-bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px; /* Optional: Add some padding */
  background-color: white; /* To prevent it from overlapping the content */
  z-index: 10; /* Make sure it stays above other elements */
}
.van-action-sheet__gap {
  position: fixed;
  bottom: 74px;
  left: 0;
  width: 100%;
  background-color: #f7f8fa; /* To prevent it from overlapping the content */
  z-index: 10; /* Make sure it stays above other elements */
}
</style>
