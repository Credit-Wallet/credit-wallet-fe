<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';
import avatar from 'assets/images/avatar.jpeg';

const userName = ref('phanhoaian09006@gmail.com');
const isVerified = ref(true);

const sections = ref([
  { icon: 'user-o', text: 'Hồ sơ' },
  { icon: 'orders-o', text: 'Dịch vụ' },
  { icon: 'setting-o', text: 'Cài đặt' },
  { icon: 'question-o', text: 'Trung tâm trợ giúp' },
]);

const handleSectionClick = (section) => {
  Toast(`Clicked on ${section.text}`);
};
</script>

<template>
  <div>
    test
    <!-- Top Section -->
    <div class="profile-header">
      <div class="profile-info">
        <van-image
          round
          width="70px"
          height="70px"
          :src="avatar"
          fit="cover"
        />
        <div class="profile-details">
          <div class="profile-name tw-truncate tw-w-4/5">{{ userName }}</div>
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
}

.profile-name {
  font-size: 20px;
  color: white;
  font-weight: bold;
}
</style>
