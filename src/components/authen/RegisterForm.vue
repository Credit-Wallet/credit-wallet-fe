<script setup>
import { ref } from 'vue';
// Import validation utilities
import { showToast } from 'vant';
import AuthAPI from 'app/api/auth';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
});
const router = useRouter();

const onFailed = (error) => {
  showToast(error.errors[0].message);
};

const onSubmit = async (values) => {
  await AuthAPI.register(values).then(async () => {
    showToast('Register successfully');
    const res = await AuthAPI.login({
      email: form.value.email,
      password: form.value.password,
    });
    localStorage.setItem('access_token', res.result?.token ?? '');
    await router.push('/');
  }).catch(() => {
    showToast('Register failed');
  });
};

const forgotPassword = () => {
  showToast('Feature is in development');
};
</script>

<template>
  <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Create an account</h1>
  <p class="tw-text-center tw-text-gray-600 tw-mb-6">Connect with your friends today!</p>

  <van-form @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="form.username"
      name="name"
      label="Name"
      placeholder="Enter your name"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.{3,}$/, message: 'Name must contain at least 3 characters' }]"
    />
    <van-field
      v-model="form.email"
      name="email"
      label="Email"
      placeholder="Enter your email"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.+@.+\..+$/, message: 'Invalid email' }]"
    />
    <van-field
      v-model="form.phone"
      name="phone"
      label="Phone"
      placeholder="Enter your phone"
      required
      class="tw-mb-4"
      :rules="[{
        pattern: /^\d{10}$/,
        message: 'Invalid phone number',
      }]"
    />
    <van-field
      v-model="form.password"
      name="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      required
      clearable
      class="tw-mb-4"
      :rules="[{
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/,
        message: 'Password must contain at least 8 characters, including uppercase, lowercase letters and numbers',
      }]"
    />
    <van-field
      v-model="form.confirmPassword"
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      placeholder="Confirm your password"
      required
      clearable
      class="tw-mb-4"
      :rules="[{
        validator: (value) => value === form.password,
        message: 'Password mismatch',
      }]"
    />
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <van-checkbox v-model="form.rememberMe">Remember Me</van-checkbox>
      <span class="tw-text-primary text-weight-bold" @click="forgotPassword"></span>
    </div>
    <van-button round block type="primary" native-type="submit" class="tw-mb-4">Sign Up</van-button>
  </van-form>
</template>

<style scoped>

</style>
