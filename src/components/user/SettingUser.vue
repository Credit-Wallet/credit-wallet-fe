<script setup>
import AuthApi from 'app/api/auth';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { useAccountStore } from 'stores/account-store';
import { useNetworkStore } from 'stores/network-store';

const router = useRouter();
const accountStore = useAccountStore();
const networkStore = useNetworkStore();

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
</script>

<template>
<!-- logout -->
  <van-cell title="Đăng xuất" is-link @click="handleLogout" />
</template>

<style scoped>

</style>
