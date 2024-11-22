<script setup>
import { onMounted, ref } from 'vue';
import NetworkAPI from 'app/api/network';
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant';
import { useRoute } from 'vue-router';

const network = ref();
const route = useRoute();
const loading = ref(false);

const fetchNetwork = async () => {
  const networkUuid = route.params.uuid;

  await NetworkAPI.getNetworkByUuid(networkUuid).then((response) => {
    network.value = response.result;
  }).catch(() => {
    showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau');
  });
};

const confirmJoinNetwork = async () => {
  showLoadingToast({
    message: 'Đang xử lý...',
    forbidClick: true,
  });
  loading.value = true;
  await NetworkAPI.joinNetworkByUuid(network.value.uuid).then(() => {
    showSuccessToast('Tham gia nhóm thành công');
  }).catch((error) => {
    if (error.response?.data.code === 409) {
      showFailToast('Bạn đã tham gia nhóm này rồi');
      return;
    }

    showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau');
  }).finally(() => {
    loading.value = false;
  });
};

onMounted(() => {
  fetchNetwork();
});
</script>

<template>
  <div class="van-card tw-m-4">
    <div class="tw-flex tw-flex-col tw-items-center">
      <van-icon name="friends" color="#4CAF50" size="80" />
      <h2 class="tw-text-base">Bạn có muốn tham gia nhóm {{ network?.name }} ?</h2>
    </div>

    <div class="tw-flex tw-justify-around tw-mt-2">
      <van-button type="default" to="/">Quay về trang chủ</van-button>
      <van-button type="primary" @click="confirmJoinNetwork" :loading="loading">Xác nhận</van-button>
    </div>
  </div>
</template>

<style scoped>

</style>
