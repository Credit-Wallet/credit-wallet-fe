<script setup>
import { ref } from 'vue';
import avatar from 'assets/images/avatar.jpeg';
import { useAccountStore } from 'stores/account-store';
import { showToast } from 'vant';

const accountStore = useAccountStore();

const account = ref(accountStore.getAccount);

// Xử lý khi nhấn vào "Cần cập nhật"
const handleUpdateClick = () => {
  showToast('Đang phát triển');
};
</script>

<template>
  <div>
    <!-- Hình ảnh -->
    <van-cell :value="''" is-link>
      <template #title>
        <div class="tw-mt-2">Hình ảnh</div>
      </template>

      <template #right-icon>
        <van-image :src="avatar" width="40" height="40" round />
      </template>
    </van-cell>

    <van-cell title="Tên" :value="account.username" is-link />

    <van-cell title="Email" :value="account.email" is-link />

    <van-cell>
      <template #title>
        <div class="update-title">Cập nhật thông tin</div>
        <div class="update-description">
          Theo quy định NHNN, bạn cần cập nhật CCCD/CC gắn chip để tiếp tục giao dịch. Chọn Cập nhật ngay > Xác minh bằng NFC để cập nhật
        </div>
      </template>
      <template #right-icon>
        <span class="update-action" @click="handleUpdateClick">Cần cập nhật</span>
      </template>
    </van-cell>
  </div>
</template>

<style scoped>
.update-title {
  font-weight: bold;
}

.update-description {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.update-action {
  color: #ee0a24;
  cursor: pointer;
  font-weight: bold;
}
</style>
