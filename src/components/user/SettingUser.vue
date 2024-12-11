<script setup>
import AuthApi from 'app/api/auth';
import AccountAPI from 'app/api/account';
import { useRouter } from 'vue-router';
import { showFailToast, showToast } from 'vant';
import { useAccountStore } from 'stores/account-store';
import { useNetworkStore } from 'stores/network-store';
import { ref } from 'vue';

const router = useRouter();
const accountStore = useAccountStore();
const networkStore = useNetworkStore();
const loading = ref(false);
const showTwoFactor = ref(false);
const imgQRTwoFactor = ref('');

const handleLogout = async () => {
  await AuthApi.logout().then((response) => {
    console.log('Logout:', response);
    if (response.code === 200) {
      showToast('Đăng xuất thành công')
      localStorage.removeItem('access_token');
      accountStore.clearAccount();
      networkStore.clearNetworks();
      router.push('/login');
    }
  }).catch((error) => {
    showToast(error);
  });
};

const updateTwoFactor = async () => {
  loading.value = true;
  await AccountAPI.updateIsTwoFactor().then((response) => {
    if (response.code === 200) {
      loading.value = false;
      if (response.result === true) {
        AuthApi.generateTwoFactor(accountStore.getAccount.username).then((res) => {
          console.log('Generate two factor:', res);
          if (res.code === 200) {
            showTwoFactor.value = true;

            //convert base64 to image
            imgQRTwoFactor.value = 'data:image/png;base64,' + res.result.qrCodeBase64Image;
          }
        }).catch(() => {
          showFailToast('Cập nhật thất bại');
        });
      } else {
        showFailToast('Tắt xác thực hai yếu tố thành công');
      }
    }
  }).catch(() => {
    showFailToast('Cập nhật thất bại');
  }).finally(() => {
    loading.value = false;
  });
};
</script>

<template>
<!-- logout -->
  <van-cell title="Xác thực hai yếu tố">
    <template #right-icon>
      <van-switch v-model="accountStore.getAccount.twoFactor" @click="updateTwoFactor" :loading="loading" />
    </template>
  </van-cell>
  <van-cell title="Đăng xuất" is-link @click="handleLogout" />

  <van-dialog v-model:show="showTwoFactor" title="Mã xác thực 2 yếu tố" :show-cancel-button="false" class="tw-text-center">
    <van-image :src="imgQRTwoFactor" fit="cover" />
  </van-dialog>
</template>

<style scoped>

</style>
