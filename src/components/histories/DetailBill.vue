<script setup>
import BillAPI from 'app/api/bill';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatMoney, formatTime } from 'src/util/formatter';

const bill = ref({});
const router = useRouter();
const loading = ref(false);

const fetchBill = async () => {
  loading.value = true;
  const billId = router.currentRoute.value.params.id;
  try {
    const response = await BillAPI.getBillById(billId);
    bill.value = response.result;
  } catch (error) {
    console.log('Fetch bill failed:', error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchBill();
});
</script>

<template>
  <van-skeleton v-if="loading" title :row="5" class="tw-mt-2" />
  <div v-else>
    <!-- Số tiền đã thanh toán -->
    <div class="payment-info">
      <h2 class="amount-paid">{{ formatMoney(bill.amount) }}</h2>
      <van-tag v-if="bill.status == 'COMPLETED'" type="success" class="success-tag">Thành công</van-tag>
      <van-tag v-if="bill.status == 'PENDING'" type="warning" class="success-tag">Đang xử lý</van-tag>
      <van-tag v-if="bill.status == 'CANCELLED'" type="danger" class="success-tag">Đã hủy</van-tag>
      <div class="completion-time">Thời gian {{ formatTime(bill.createdAt) }}</div>
    </div>

    <van-divider />

    <!-- Thông tin thanh toán -->
    <div class="pay-to">
      <van-cell
        title="Nội dung yêu cầu"
        icon="shopping-cart"
        :value="bill.name"
        label=""
      />
    </div>

    <van-divider />

    <!-- Thông tin đơn hàng -->
    <div class="order-info">
      <h3 class="section-title">Thông tin chi tiết yêu cầu</h3>
      <van-list
        finished-text="Finished"
        class="tw-h-[57vh] tw-overflow-y-auto"
      >
        <van-swipe-cell v-for="(item, index) in bill.billRequests" :key="index">
          <div class="transaction-item">
            <div class="transaction-icon">
              <van-icon name="balance-o" class="icon-style" />
            </div>
            <div class="transaction-content">
              <div class="transaction-title">Tên: {{ item.account?.username }}</div>
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
        </van-swipe-cell>
      </van-list>
    </div>
  </div>
</template>

<style scoped>
.payment-info {
  text-align: center;
  padding: 16px;
}
.amount-paid {
  font-size: 28px;
  color: #ee0a24;
  margin: 0;
}
.success-tag {
  margin-top: 8px;
}
.completion-time {
  margin-top: 4px;
  color: #666;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 16px 0 8px 16px;
}

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
