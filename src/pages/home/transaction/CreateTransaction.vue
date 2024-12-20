<script setup>
import avatar from 'assets/images/avatar.jpeg';
import { onMounted, ref, watch } from 'vue';
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
const search = ref('');
const baseUrl = process.env.backend_url;

const listSelectedTransaction = ref([
  {
    id: account.account.id,
    avatar: account.account.urlAvatar,
    username: account.account.username,
    email: account.account.email,
    selected: true,
    isSelf: true,
  }
]);
const mySelf = Object.assign({}, listSelectedTransaction.value[0]);

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
    avatar: member.urlAvatar,
    username: member.username,
    email: member.email,
    selected: false,
    isSelf: false,
  };
}));

const memberSearch = Object.assign([], members.value);

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

const updateMySelf = () => {
  mySelf.isSelf = !mySelf.isSelf;
  if (mySelf.isSelf) {
    listSelectedTransaction.value.push(mySelf);
  } else {
    removeMember(mySelf);
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

const searchMembers = (search) => {
  if (!search) return memberSearch;

  return memberSearch.filter((member) => {
    return member.username.toLowerCase().includes(search.toLowerCase());
  });
};

const removeAll = () => {
  mySelf.isSelf = true;
  listSelectedTransaction.value = [mySelf];
  members.value.forEach((member) => {
    member.selected = false;
  });
};

const selectedAll = () => {
  mySelf.isSelf = true;
  listSelectedTransaction.value = [{
    id: account.account.id,
    avatar: account.account.urlAvatar,
    username: account.account.username,
    email: account.account.email,
    selected: true,
    isSelf: true,
  }];
  listSelectedTransaction.value = listSelectedTransaction.value.concat(members.value);
  members.value.forEach((member) => {
    member.selected = true;
  });
};

watch(search, (value) => {
  members.value = searchMembers(value);
});

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
    v-model="search"
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
            <span v-if="listSelectedTransaction.length > 1" class="tw-text-base tw-ml-2 tw-mt-1" @click="removeAll">Bỏ chọn tất cả</span>
            <span v-else class="tw-text-base tw-ml-2 tw-mt-1" @click="selectedAll">Chọn tất cả</span>
        </div>
      </div>

      <div class="van-card__content">
        <div class="tw-mt-2 tw-overflow-x-auto tw-flex tw-space-x-4 tw-py-2">
          <van-badge :offset="[-12, 0]" color="#000" v-if="mySelf.isSelf">
            <div class="tw-flex tw-flex-col tw-items-center tw-w-[80px]">
              <van-image
                round
                width="50px"
                height="50px"
                fit="cover"
                :src="mySelf.avatar ? baseUrl + mySelf.avatar : avatar"
              />
              <span class="tw-text-sm tw-mt-1 tw-truncate tw-w-full tw-text-center">Bao gồm tôi</span>
            </div>

            <template #content>
              <van-icon name="cross" class="badge-icon" @click="updateMySelf" />
            </template>
          </van-badge>
          <div v-else class="tw-flex tw-flex-col tw-items-center tw-w-[80px]">
            <van-image
              round
              width="50px"
              height="50px"
              fit="cover"
              :src="mySelf.avatar ? baseUrl + mySelf.avatar : avatar"
              @click="updateMySelf"
            />
            <span class="tw-text-sm tw-mt-1 tw-truncate tw-w-full tw-text-center">Bao gồm tôi</span>
          </div>
          <van-badge :offset="[-12, 0]" color="#000" v-for="(member, index) in listSelectedTransaction" :key="index" v-show="!member.isSelf">
            <div class="tw-flex tw-flex-col tw-items-center tw-w-[80px]">
              <van-image
                round
                width="50px"
                height="50px"
                fit="cover"
                :src="member.avatar ? baseUrl + member.avatar : avatar"
              />
              <span class="tw-text-sm tw-mt-1 tw-truncate tw-w-full tw-text-center">{{ member.username }}</span>
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

      <div class="van-card__content tw-max-h-[47vh] tw-overflow-y-auto">
        <div v-for="(member, index) in members" :key="index" class="tw-flex tw-items-center tw-py-2 tw-ml-2" @click="selectMember(member)">
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

          <van-checkbox
            :model-value="member.selected"
            class="tw-mr-4"
          />
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
