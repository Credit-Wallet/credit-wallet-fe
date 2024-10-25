<script setup>
import { ref } from 'vue';
import AuthAPI from 'app/api/auth';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const $router = useRouter();
const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;
    const response = await AuthAPI.login({
      email: form.value.email,
      password: form.value.password,
    });
    localStorage.setItem('access_token', response.result?.token ?? '');

    // Retrieve FCM token from localStorage
    const token = localStorage.getItem('fcm_token');

    // Save FCM token to the backend if available
    if (token) {
      console.log('FCM Token:', token);
      await AuthAPI.saveFcmToken(token).then(r => console.log(r));
      console.log('FCM Token saved successfully');
    }
    await $router.push('/');
  } catch (error) {
    console.log('Login failed:', error);
  }
  finally {
    loading.value = false;
  }
}

const forgotPassword = () => {
  console.log('Forgot password');
}

const onFailed = () => {
  showToast('Please check your email and password again');
};
</script>

<template>
  <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Hi, Welcome Back! 👋</h1>
  <p class="tw-text-center tw-text-gray-600 tw-mb-6">Hello again, you’ve been missed!</p>

  <van-form @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="form.email"
      label="Email"
      placeholder="Enter your email"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.+@.+\..+$/, message: 'Invalid email' }]"
    />
    <van-field
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Please Enter Your Password"
      required
      clearable
      class="tw-mb-4"
      :rules="[{
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/,
        message: 'Password must contain at least 8 characters, including uppercase, lowercase letters and numbers',
      }]"
    />
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <van-checkbox v-model="form.rememberMe">Remember Me</van-checkbox>
      <span class="tw-text-primary text-weight-bold" @click="forgotPassword">Forgot Password</span>
    </div>
    <van-button round block type="primary" native-type="submit" class="tw-mb-4" :loading="loading">Login</van-button>
  </van-form>
</template>

<style scoped>

</style>
