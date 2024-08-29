<script setup>
import LoginForm from 'components/authen/LoginForm.vue';
import { ref } from 'vue';
import RegisterForm from 'components/authen/RegisterForm.vue';

const isLogin = ref(true);
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen tw-bg-white tw-p-4">
    <div class="tw-w-full tw-max-w-md">
      <login-form v-if="isLogin" />
      <register-form v-else />

      <div class="tw-flex tw-items-center tw-my-4">
        <div class="tw-flex-grow tw-h-px tw-bg-gray-300"></div>
        <span class="tw-mx-2 tw-text-gray-500">Or With</span>
        <div class="tw-flex-grow tw-h-px tw-bg-gray-300"></div>
      </div>

      <div class="tw-flex tw-justify-center tw-space-x-4 tw-mb-6">
        <van-button round plain class="tw-flex-1">Google</van-button>
        <van-button round plain class="tw-flex-1">Facebook</van-button>
      </div>

      <p class="tw-text-center tw-text-gray-600" v-if="isLogin">
        Don't have an account?
        <span class="tw-text-primary text-weight-bold" @click="isLogin = false">
          Sign Up
        </span>
      </p>
      <p class="tw-text-center tw-text-gray-600" v-else>
        Already have an account ?
        <span class="tw-text-primary text-weight-bold">
          Login
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
