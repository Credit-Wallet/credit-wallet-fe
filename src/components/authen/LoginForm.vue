<script setup>
import { ref } from 'vue';
import AuthAPI from 'app/api/auth';
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const $router = useRouter();
const loading = ref(false);
const showPassword = ref(false);

const onSubmit = async () => {
  loading.value = true;
  await AuthAPI.login({
    email: form.value.email,
    password: form.value.password,
  }).then((response) => {
    localStorage.setItem('access_token', response.result?.token ?? '');
  }).catch(() => {
    showFailToast('Vui lòng kiểm tra lại thông tin đăng nhập');
  }).finally(() => {
    loading.value = false;
  });

  // Save FCM token
  const token = localStorage.getItem('fcm_token');
  if (token) {
    await AuthAPI.saveFcmToken(token).then(r => console.log(r));
  }

  await $router.push('/');
}

const forgotPassword = () => {
  showFailToast('Chức năng đang phát triển');
}

const onFailed = () => {
  showFailToast('Vui lòng kiểm tra lại thông tin đăng nhập');
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Chào mừng bạn!👋</h1>
  <p class="tw-text-center tw-text-gray-600 tw-mb-6">Hãy cùng nhau xây dựng những điều tuyệt vời.</p>

  <van-form @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="form.email"
      label="Email"
      placeholder="Nhập địa chỉ email của bạn"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.+@.+\..+$/, message: 'Email không hợp lệ' }]"
    />
    <van-field
      v-model="form.password"
      label="Mật khẩu"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Nhập mật khẩu của bạn"
      required
      clearable
      class="tw-mb-4"
      :rules="[{
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/,
        message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
      }]"
    >
      <template #right-icon>
        <van-icon
          size="20"
          name="eye-o"
          @click="togglePassword"
          :class="showPassword ? 'tw-text-primary' : ''"
        />
      </template>
    </van-field>
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <van-checkbox v-model="form.rememberMe">Ghi nhớ tài khoản</van-checkbox>
      <span class="tw-text-primary text-weight-bold" @click="forgotPassword">Quên mật khẩu?</span>
    </div>
    <van-button round block type="primary" native-type="submit" class="tw-mb-4" :loading="loading">Đăng nhập</van-button>
  </van-form>
</template>

<style scoped>

</style>
