<script setup>
import BillRequestAPI from 'app/api/billRequest';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatMoney, formatTime } from 'src/util/formatter';
import { useAccountStore } from 'stores/account-store';

const billRequest = ref({});
const router = useRouter();
const loading = ref(false);
const accountStore = useAccountStore();

const account = accountStore.getAccount;

const fetchBillRequest = async () => {
  loading.value = true;
  const billRequestId = router.currentRoute.value.params.id;
  try {
    const response = await BillRequestAPI.getBillRequest(billRequestId);
    billRequest.value = response.result;
  } catch (error) {
    console.log('Fetch bill request failed:', error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchBillRequest();
});
</script>

<template>
  <div>
    <!-- Số tiền đã thanh toán -->
    <div class="payment-info">
      <h2 class="amount-paid">{{ formatMoney(billRequest.amount) }}</h2>
      <van-tag v-if="billRequest.status == 'COMPLETED'" type="success" class="success-tag">Thành công</van-tag>
      <van-tag v-if="billRequest.status == 'PENDING'" type="warning" class="success-tag">Đang xử lý</van-tag>
      <van-tag v-if="billRequest.status == 'CANCELLED'" type="danger" class="success-tag">Đã hủy</van-tag>
      <div class="completion-time">Thời gian {{ formatTime(billRequest.createdAt) }}</div>
    </div>

    <van-divider />

    <!-- Thông tin thanh toán -->
    <div class="pay-to">
      <van-cell
        title="Yêu cầu thanh toán này thuộc nhóm:"
        :value="billRequest.network?.name"
        label=""
      />
    </div>

    <van-divider />

    <!-- Thông tin đơn hàng -->
    <div class="order-info">
      <h3 class="section-title">Thông tin chi tiết yêu cầu thanh toán: {{ billRequest.bill?.name }}</h3>
      <van-list
        finished-text="Finished"
        class="tw-h-[45vh] tw-overflow-y-auto"
      >
        <van-swipe-cell v-for="(item, index) in billRequest.bill?.billRequests" :key="index">
          <div class="transaction-item">
            <div class="transaction-icon">
              <van-icon name="balance-o" class="icon-style" />
            </div>
            <div class="transaction-content">
              <div class="transaction-title" v-if="account?.id === item.accountId">Yêu cầu thanh toán của tôi</div>
              <div class="transaction-title" v-else>Tên: ***</div>
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
