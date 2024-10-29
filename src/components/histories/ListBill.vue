<script setup>
import BillAPI from 'app/api/bill'; // Assuming BillAPI is set up properly
import { ref } from 'vue';
import { formatMoney, formatTime } from 'src/util/formatter';
import { useRouter } from 'vue-router';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(0);
const pageSize = ref(10);
const router = useRouter();

const onLoad = async () => {
  loading.value = true;
  try {
    const response = await BillAPI.getBills({
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

const cancelBill = async (dataBill) => {
  try {
    await BillAPI.cancelBill(dataBill.id, dataBill);
    list.value = list.value.filter((bill) => bill.id !== dataBill.id);
  } catch (error) {
    console.log('Cancel bill failed:', error);
  }
};

const confirmBill = async (billId) => {
  try {
    await BillAPI.confirmBill(billId);
    list.value = list.value.filter((bill) => bill.id !== billId);
  } catch (error) {
    console.log('Confirm bill failed:', error);
  }
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
          <div class="transaction-content" @click="router.push('/history/bill/' + item.id)">
            <div class="transaction-title">Nội dung: {{ item.name }}</div>
            <div class="transaction-description">{{ item.description }}</div>
            <div class="transaction-amount tw-flex tw-justify-between">
              <span>Số tiền: {{ formatMoney(item.amount) }}</span>
              <van-tag v-if="item.status == 'COMPLETED'" type="success" class="success-tag">Thành công</van-tag>
              <van-tag v-if="item.status == 'PENDING'" type="warning" class="success-tag">Đang xử lý</van-tag>
              <van-tag v-if="item.status == 'CANCELLED'" type="danger" class="success-tag">Đã hủy</van-tag>
            </div>
            <div class="transaction-time">{{ formatTime(item.createdAt) }}</div>
          </div>
        </div>

        <template #right>
          <van-button square text="Xác nhận" type="success" class="delete-button" style="height: 100%;" @click="confirmBill(item.id)" :disabled="item.status == 'COMPLETED' || item.status == 'CANCELLED'" />
          <van-button square text="Hủy" type="danger" class="delete-button" style="height: 100%;" @click="cancelBill(item)" :disabled="item.status == 'COMPLETED' || item.status == 'CANCELLED'" />
        </template>
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
}

.transaction-title {
  font-weight: bold;
  font-size: 16px;
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
