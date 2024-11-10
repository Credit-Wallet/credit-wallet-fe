<script setup>
import TransactionAPI from 'app/api/transaction';
import { ref } from 'vue';
import { formatMoney, formatTime } from 'src/util/formatter';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(0);
const pageSize = ref(10);

const onLoad = async () => {
  loading.value = true;
  try {
    const response = await TransactionAPI.getTransactions({
      page: page.value,
      limit: pageSize.value,
      sort: 'createdAt,DESC'
    });

    const bills = response.result.content;

    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    list.value.push(...bills);

    loading.value = false;

    if (response.result.last) {
      finished.value = true;
    } else {
      page.value += 1;
    }
  } catch (error) {
    loading.value = false;
    finished.value = true;
  }
};

const onRefresh = () => {
  finished.value = false;
  page.value = 0;
  refreshing.value = true;
  onLoad();
};
</script>

<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="Finished"
      @load="onLoad"
      class="tw-h-[83vh] tw-overflow-y-auto"
      offset="100"
    >
      <van-swipe-cell v-for="(item, index) in list" :key="index">
        <div class="transaction-item">
          <div class="transaction-icon">
            <van-icon name="balance-o" class="icon-style" />
          </div>
          <div class="transaction-content">
            <div class="transaction-title tw-flex tw-justify-between">
              <span>Người gửi: {{ item?.fromAccount.username }}</span>
              <span>Người nhận: {{ item?.toAccount.username }}</span>
            </div>
            <div class="transaction-description">{{ item.description }}</div>
            <div class="transaction-amount tw-flex tw-justify-between">
              <span>Số tiền: {{ formatMoney(item.amount) }}</span>
              <span>Mạng: {{ item.networkId }}</span>
            </div>
            <div class="tw-flex tw-justify-between">
              <div class="transaction-time">{{ formatTime(item.createdAt) }}</div>

              <a v-if="item.hash != null" href="https://sepolia.infura.io/v3/ + {{ item.hash }}" class="tw-text-blue-500 transaction-title">
                Xem chi tiết trên Blockchain
              </a>
            </div>
          </div>
        </div>
      </van-swipe-cell>
    </van-list>
  </van-pull-refresh>
</template>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  border-radius: 8px;
}

.transaction-icon {
  margin-right: 10px;
}

.icon-style {
  font-size: 24px;
  color: #f60;
}

.transaction-content {
  flex-grow: 1;
  word-break: break-word;
}

.transaction-title {
  font-size: 14px;
}

.transaction-title span {
  white-space: normal;
  word-break: break-word;
}

.transaction-description {
  font-size: 14px;
  color: #555;
}

.transaction-amount {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

.transaction-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>
