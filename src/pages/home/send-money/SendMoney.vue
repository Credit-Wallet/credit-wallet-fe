<script setup>

import avatar from 'assets/images/avatar.jpeg';
import { ref, watch } from 'vue';
import { useNetworkStore } from 'stores/network-store';
import { formatMoneyToNumber, formatMoneyVant } from 'src/util/formatter';
import TransactionAPI from 'app/api/transaction';
import { showFailToast, showSuccessToast, showToast } from 'vant';

const networks = useNetworkStore();
const search = ref('');
const isConfirmSendMoney = ref(false);
const memberSendMoney = ref({});
const money = ref(null);
const description = ref(null);
const formTransferMoney = ref(null);
const loading = ref(false);
const baseUrl = process.env.backend_url;

const members = ref(networks.members.map((member) => {
  return {
    id: member.id,
    avatar: member.urlAvatar,
    username: member.username,
    email: member.email,
    selected: false,
  };
}));

const memberSearch = Object.assign([], members.value);

const searchMembers = (search) => {
  if (!search) return memberSearch;

  return memberSearch.filter((member) => {
    return member.username.toLowerCase().includes(search.toLowerCase());
  });
};

watch(search, (value) => {
  members.value = searchMembers(value);
});

const confirmSendMoney = (member) => {
  isConfirmSendMoney.value = true;
  memberSendMoney.value = member;
};

const onFailed = (error) => {
  console.log('Failed:', error);
};

const transferMoney = () => {
  formTransferMoney.value.validate().then( async () => {
    loading.value = true;
    await TransactionAPI.transferMoney(memberSendMoney.value.id, formatMoneyToNumber(money.value))
      .then(() => {
        showSuccessToast('Chuyển tiền thành công!');
        isConfirmSendMoney.value = false;
        money.value = null;
        description.value = null;
      }).catch((err) => {
        if (err.response.status === 400) {
          showFailToast('Số dư của bạn không đủ!');
        } else {
          showFailToast('Chuyển tiền thất bại!');
        }
      }).finally(() => {
        loading.value = false;
      });
  }).catch(() => {
    showToast('Vui lòng nhập đầy đủ thông tin!');
  });
};
</script>

<template>
  <div v-if="!isConfirmSendMoney">
    <van-search
      shape="round"
      placeholder="Tìm kiếm"
      v-model="search"
    />

    <div class="van-card tw-mx-3">
      <div class="van-card__header">
        <div class="van-card__title tw-w-full tw-flex tw-justify-between">
          <span class="tw-text-base tw-ml-2 tw-mt-1">Danh sách thành viên</span>
        </div>
      </div>

      <div class="van-card__content  tw-max-h-[80vh] tw-overflow-y-auto">
        <div v-for="(member, index) in members" :key="index" class="tw-flex tw-items-center tw-py-2 tw-ml-2" @click="confirmSendMoney(member)">
          <van-image
            round
            width="40px"
            height="40px"
            fit="cover"
            :src="member.avatar ? baseUrl + member.avatar : avatar"
          />
          <div class="tw-ml-4 tw-flex-grow">
            <div class="tw-font-medium">{{ member.username }}</div>
            <div class="tw-text-gray-500">{{ member.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="tw-mt-2">
    <div class="van-card tw-mx-3">
      <div class="van-card__header">
        <div class="van-card__title tw-w-full tw-flex tw-justify-between">
          <van-image
            round
            width="40px"
            height="40px"
            fit="cover"
            :src="memberSendMoney.avatar ? baseUrl + memberSendMoney.avatar : avatar"
          />
          <div class="tw-ml-4 tw-flex-grow">
            <div class="tw-font-medium">{{ memberSendMoney.username }}</div>
            <div class="tw-text-gray-500">{{ memberSendMoney.email }}</div>
          </div>
        </div>
      </div>

      <div class="van-card__content tw-mt-5 tw-mb-2 tw-max-h-[80vh] tw-overflow-y-auto">
        <van-form @failed="onFailed" ref="formTransferMoney">
          <van-field
            v-model="money"
            label="Số tiền"
            placeholder="Nhập số tiền"
            type="number"
            input-align="left"
            clearable
            required
            :formatter="formatMoneyVant"
            :rules="[{ required: true, message: 'Vui lòng nhập số tiền' },
              { validator: (value) => formatMoneyToNumber(value) > 0, message: 'Số tiền phải lớn hơn 0' },
              { validator: (value) => formatMoneyToNumber(value) <= 1000000000, message: 'Số tiền phải nhỏ hơn hoặc bằng 100,000,000' }]"
          />

          <van-field
            v-model="description"
            label="Mô tả"
            placeholder="Nhập mô tả"
            clearable
            autosize
            type="textarea"
            rows="2"
            required
            :rules="[{ required: true, message: 'Vui lòng nhập mô tả' }]"
          />
        </van-form>
      </div>
    </div>

    <div class="sticky-bottom-btn">
      <van-button type="primary" round class="tw-w-full" @click="transferMoney" :loading="loading">Chuyển tiền</van-button>
    </div>
  </div>
</template>

<style scoped>
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
</style>
