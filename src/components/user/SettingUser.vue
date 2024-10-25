<script setup>
import AuthApi from 'app/api/auth';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();

const handleLogout = async () => {
  await AuthApi.logout().then((response) => {
    console.log('Logout:', response);
    if (response.code === 200) {
      showToast('Đăng xuất thành công')
      localStorage.removeItem('access_token');
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
