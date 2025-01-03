<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NotificationAPI from 'app/api/notification';
import { formatMoney, formatTime } from 'src/util/formatter';
import BillRequestAPI from 'app/api/billRequest';
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant';

defineOptions({
  name: 'ShopeePayUpdates'
});

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
    const response = await NotificationAPI.getNotifications({
      type: 'BILL_REQUEST',
      page: page.value,
      limit: pageSize.value,
    });

    const notifications = response.result.content;

    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    list.value.push(...notifications);

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

const cancelBillRequest = async (billId, notificationId) => {
  await BillRequestAPI.cancelBillRequest(billId).then((res) => {
    if (res.code === 200) {
      list.value = list.value.map((item) => {
        if (item.billRequest?.bill?.id === billId) {
          item.billRequest.status = 'CANCELLED';
        }
        return item;
      });

      NotificationAPI.readNotification(notificationId).then(() => {
        list.value = list.value.map((item) => {
          if (item.id === notificationId) {
            item.read = true;
          }
          return item;
        });
      });
      showSuccessToast('Hủy yêu cầu thành công');
    }
  }).catch(() => {
    showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau.');
  });
};

const confirmBillRequest = async (billId, notificationId) => {
  showLoadingToast({
    message: 'Đang xử lý...',
    forbidClick: true,
  });
  await BillRequestAPI.confirmBillRequest(billId).then((res) => {
    if (res.code === 200) {
      list.value = list.value.map((item) => {
        if (item.billRequest?.bill?.id === billId) {
          item.billRequest.status = 'COMPLETED';
        }
        return item;
      });

      NotificationAPI.readNotification(notificationId).then(() => {
        list.value = list.value.map((item) => {
          if (item.id === notificationId) {
            item.read = true;
          }
          return item;
        });
      });
      showSuccessToast('Xác nhận thành công');
    }
  }).catch((error) => {
    if (error.response.data.code === 903) {
      showFailToast('Bạn đã đạt đến giới hạn nợ, không thể nợ thêm!')
    } else {
      showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau!');
    }
  });
};

const billRequestDetail = async (billId, notification) => {
  if (!notification.read) {
    await NotificationAPI.readNotification(notification.id);
  }
  await router.push({ path: '/notification/bill_request/' + billId });
};

const readAll = async () => {
  if (list.value.map((item) => item.read).filter((read) => !read).length === 0) {
    return;
  }

  showLoadingToast({
    message: 'Đang xử lý...',
    forbidClick: true,
  });
  await NotificationAPI.readAllNotifications().then(() => {
    list.value = list.value.map((item) => {
      item.read = true;
      return item;
    });

    showSuccessToast('Đã đọc tất cả thông báo');
  }).catch(() => {
    showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau.');
  });
};
</script>

<template>
  <q-page>
    <div>
      <van-cell-group>
        <van-cell title="Cập nhật thông báo">
          <template #right-icon>
            <van-icon name="eye" size="24" class="tw-mr-2" />
            <span @click="readAll()">Đọc tất cả ({{ list.map(item => item.read).filter(read => !read).length }})</span>
          </template>
        </van-cell>
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
              <div class="transaction-item" :class="item.read ? 'tw-bg-white' : 'tw-bg-gray-100'">
                <div class="transaction-icon">
<!--                  <van-icon name="balance-o" class="icon-style" />-->
                  <q-icon name="paid" class="icon" size="40px" color="primary" />
                </div>
                <div class="transaction-content" @click="billRequestDetail(item.billRequest?.id, item)">
                  <div class="transaction-title">Nội dung: {{ item.title }}</div>
                  <div class="transaction-title">Mô tả: {{ item.billRequest?.bill?.name }}</div>
                  <div class="transaction-description">{{ item.description }}</div>
                  <div class="transaction-amount tw-flex tw-justify-between">
                    <span>Số tiền: {{ formatMoney(item.billRequest?.amount) }}</span>
                    <van-tag v-if="item.billRequest?.status == 'COMPLETED'" type="success" class="success-tag">Thành công</van-tag>
                    <van-tag v-if="item.billRequest?.status == 'PENDING'" type="warning" class="success-tag">Đang xử lý</van-tag>
                    <van-tag v-if="item.billRequest?.status == 'CANCELLED'" type="danger" class="success-tag">Đã hủy</van-tag>
                  </div>
                  <div class="transaction-time">{{ formatTime(item.billRequest?.createdAt) }}</div>
                </div>

                <van-divider />
              </div>

              <template #right>
                <van-button
                  square text="Xác nhận"
                  type="success"
                  class="delete-button"
                  style="height: 100%;"
                  :disabled="item.billRequest?.status == 'COMPLETED' || item.billRequest?.status == 'CANCELLED'"
                  @click="confirmBillRequest(item.billRequest?.bill?.id, item.id)"/>
                <van-button
                  square
                  text="Hủy"
                  type="danger"
                  class="delete-button"
                  style="height: 100%;"
                  :disabled="item.billRequest?.status == 'COMPLETED' || item.billRequest?.status == 'CANCELLED'"
                  @click="cancelBillRequest(item.billRequest?.bill?.id, item.id)"/>
              </template>
            </van-swipe-cell>
          </van-list>
        </van-pull-refresh>
      </van-cell-group>
    </div>
  </q-page>
</template>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
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
  font-size: 14px;
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
