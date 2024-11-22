<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import avatar from 'assets/images/avatar.jpeg';
import { useRouter } from 'vue-router';
import { useAccountStore } from 'stores/account-store';

const accountStore = useAccountStore();
const account = ref(accountStore.getAccount);
const isVerified = ref(true);
const router = useRouter();
const baseUrl = process.env.backend_url;

const sections = ref([
  { id: 1, icon: 'user-o', text: 'Hồ sơ' },
  { id: 2, icon: 'orders-o', text: 'Dịch vụ' },
  { id: 3, icon: 'setting-o', text: 'Cài đặt' },
  { id: 4, icon: 'question-o', text: 'Trung tâm trợ giúp' },
]);

const handleSectionClick = (section) => {
  switch (section.id) {
    case 1:
      router.push('/user/profile');
      break;
    case 2:
      showToast('Đang phát triển...');
      break;
    case 3:
      router.push('/user/settings');
      break;
    case 4:
      showToast('Đang phát triển...');
      break;
    default:
      break;
  }
};
</script>

<template>
  <div>
    <!-- Top Section -->
    <div class="profile-header">
      <div class="profile-info">
        <van-image
          round
          width="70px"
          height="70px"
          :src="account.urlAvatar ? baseUrl + account.urlAvatar : avatar"
          fit="cover"
        />
        <div class="profile-details">
          <div class="profile-name tw-truncate tw-w-4/5">{{ account.email }}</div>
          <van-tag type="primary" v-if="isVerified" size="medium">Đã xác thực</van-tag>
        </div>
      </div>
    </div>

    <!-- List Section -->
    <div class="tw-mt-[-16px] tw-rounded-t-2xl tw-overflow-hidden">
      <van-cell-group>
        <van-cell v-for="(section, index) in sections" :key="index" clickable @click="handleSectionClick(section)" class="tw-flex tw-items-center">
          <template #icon>
            <van-icon size="25px" :name="section.icon" />
          </template>
          <template #title>
            <div class="tw-ml-3">
              {{ section.text }}
            </div>
          </template>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
/* Profile Header Styling */
.profile-header {
  background: linear-gradient(to right, rgba(142, 45, 226, 0.8), rgba(74, 0, 224, 0.8));
  padding: 20px 20px 36px 20px;
  display: flex;
  align-items: center;
}

.profile-info {
  display: flex;
  align-items: center;
}

.profile-avatar {
  color: white;
}

.profile-details {
  margin-left: 12px;
  min-width: 270px;
}

.profile-name {
  font-size: 20px;
  color: white;
  font-weight: bold;
}
</style>
