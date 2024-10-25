<script setup>
import avatar from 'assets/images/avatar.jpeg';
import { onMounted, ref } from 'vue';
import { useNetworkStore } from 'stores/network-store';
import AccountAPI from 'app/api/account';
import { useAccountStore } from 'stores/account-store';
import { useTransactionStore } from 'stores/transaction-store';
import { useRouter } from 'vue-router';
import { formatMoneyToNumber, formatMoneyVant } from 'src/util/formatter';
import { showToast } from 'vant';

const networks = useNetworkStore();
const account = useAccountStore();
const transaction = useTransactionStore();
const router = useRouter();
const money = ref(null);
const form = ref(null);

const listSelectedTransaction = ref([
  {
    id: account.account.id,
    avatar: account.account.avatar || avatar,
    username: account.account.username,
    email: account.account.email,
    selected: true,
    isSelf: true,
  }
]);

const fetchMembers = async (networkId) => {
  await AccountAPI.getAccountsByNetworkId({ networkId: networkId}).then((response) => {
    networks.addMembers(response.result);
  }).catch((error) => {
    console.log('Fetch networks failed:', error);
  });
};

const members = ref(networks.members.map((member) => {
  return {
    id: member.id,
    avatar: member.avatar || avatar,
    username: member.username,
    email: member.email,
    selected: false,
    isSelf: false,
  };
}));

const selectMember = (member) => {
  member.selected = !member.selected
  if (member.selected) {
    listSelectedTransaction.value.push(member);
  } else {
    removeMember(member);
  }
};

const removeMember = (member) => {
  member.selected = false;
  const index = listSelectedTransaction.value.findIndex(
    (selectedMember) => selectedMember.email === member.email
  );
  if (index !== -1) {
    listSelectedTransaction.value.splice(index, 1); // Remove the member by index
  }
};

const continueTransaction = () => {
  form.value.validate().then(() => {
    if (listSelectedTransaction.value.length < 2) {
      showToast('Vui lòng chọn ít nhất 2 thành viên');
      return;
    }

    transaction.setMoney(money.value, listSelectedTransaction.value);
    transaction.setNetworkId(networks.selectedNetwork.id);
    router.push('/home/confirm-transaction');
  }).catch(() => {
    showToast('Vui lòng nhập số tiền');
  });
};

const onFailed = (error) => {
  console.log('Failed:', error);
};

onMounted(
  () => {
    if (networks.countMembers === 0) {
      fetchMembers(networks.selectedNetwork.id);
    }
  }
);
</script>

<template>
  <van-search
    shape="round"
    placeholder="Tìm kiếm"
  />

  <div class="tw-mx-3">
    <div class="van-card">
      <div class="van-card__content cart_content_money">
        <van-form @failed="onFailed" ref="form">
          <van-field
            v-model="money"
            label="Số tiền"
            placeholder="Nhập số tiền"
            type="number"
            input-align="right"
            clearable
            required
            :formatter="formatMoneyVant"
            :rules="[{ required: true, message: 'Vui lòng nhập số tiền' },
              { validator: (value) => formatMoneyToNumber(value) > 0, message: 'Số tiền phải lớn hơn 0' },
              { validator: (value) => formatMoneyToNumber(value) <= 1000000000, message: 'Số tiền phải nhỏ hơn hoặc bằng 100,000,000' }]"
          />
        </van-form>
      </div>
    </div>

    <div class="van-card">
      <div class="van-card__header">
        <div class="van-card__title tw-w-full tw-flex tw-justify-between">
            <span class="tw-text-base tw-ml-2 tw-mt-1">Danh sách chia tiền ({{ listSelectedTransaction.length }})</span>
            <span class="tw-text-base tw-ml-2 tw-mt-1">Bỏ chọn tất cả</span>
        </div>
      </div>

      <div class="van-card__content">
        <div class="tw-mt-2 tw-overflow-x-auto tw-flex tw-space-x-4 tw-py-2">
          <van-badge :offset="[-12, 0]" color="#000" v-for="(member, index) in listSelectedTransaction" :key="index">
            <div class="tw-flex tw-flex-col tw-items-center tw-w-[80px]">
              <van-image
                round
                width="50px"
                height="50px"
                :src="member.avatar"
              />
              <span v-if="member.isSelf" class="tw-text-sm tw-mt-1 tw-truncate tw-w-full tw-text-center">Bao gồm tôi</span>
              <span v-else class="tw-text-sm tw-mt-1 tw-truncate tw-w-full tw-text-center">{{ member.username }}</span>
            </div>

            <template #content>
              <van-icon name="cross" class="badge-icon" @click="removeMember(member)" />
            </template>
          </van-badge>
        </div>
      </div>
    </div>

    <!-- Danh sách thành viên -->
    <div class="van-card">
      <div class="van-card__header">
        <div class="van-card__title tw-w-full tw-flex tw-justify-between">
          <span class="tw-text-base tw-ml-2 tw-mt-1">Danh sách thành viên</span>
        </div>
      </div>

      <div class="van-card__content">
        <div v-for="(member, index) in members" :key="index" class="tw-flex tw-items-center tw-py-2" @click="selectMember(member)">
          <van-image
            round
            width="40px"
            height="40px"
            :src="member.avatar || avatar"
          />
          <div class="tw-ml-4 tw-flex-grow">
            <div class="tw-font-medium">{{ member.username }}</div>
            <div class="tw-text-gray-500">{{ member.email }}</div>
          </div>
          <van-checkbox v-model="member.selected" />
        </div>
      </div>
    </div>
  </div>

  <div class="van-action-sheet__gap"></div>

  <div class="sticky-bottom-btn">
    <van-button type="primary" round class="tw-w-full" @click="continueTransaction">Tiếp tục</van-button>
  </div>
</template>

<style scoped>
.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
.cart_content_money {
  min-height: 50px !important;
}
/* Position the button at the bottom */
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
