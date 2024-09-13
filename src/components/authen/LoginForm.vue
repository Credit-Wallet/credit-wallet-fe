<script setup>
import { ref } from 'vue';
import AuthAPI from 'app/api/auth';
import { useRouter } from 'vue-router';

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
    loading.value = false;
    await $router.push('/');
  } catch (error) {
    console.log('Login failed:', error);
  }
}

const forgotPassword = () => {
  console.log('Forgot password');
}
</script>

<template>
  <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Hi, Welcome Back! 👋</h1>
  <p class="tw-text-center tw-text-gray-600 tw-mb-6">Hello again, you’ve been missed!</p>

  <van-form @submit="onSubmit">
    <van-field
      v-model="form.email"
      label="Email"
      placeholder="Enter your email"
      required
      class="tw-mb-4"
    />
    <van-field
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Please Enter Your Password"
      required
      clearable
      class="tw-mb-4"
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
