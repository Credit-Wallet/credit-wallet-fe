<script setup>
import { ref } from 'vue';
// Import validation utilities
import { showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant';
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
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);

const onFailed = (error) => {
  showFailToast(error.errors[0].message);
};

const onSubmit = async (values) => {
  loading.value = true;
  showLoadingToast({
    message: 'Đang xử lý...',
    forbidClick: true,
  });

  await AuthAPI.register(values).then(async () => {
    console.log(values);
    const res = await AuthAPI.login({
      email: form.value.email,
      password: form.value.password,
    });
    localStorage.setItem('access_token', res.result?.token ?? '');

    // Save FCM token
    const token = localStorage.getItem('fcm_token');
    if (token) {
      await AuthAPI.saveFcmToken(token).then(r => console.log(r));
    }

    showSuccessToast('Đăng ký tài khoản thành công');
    await router.push('/');
  }).catch((error) => {
    if (error.response?.data.code === 409) {
      showFailToast('Địa chỉ email đã được sử dụng');
      return;
    }
    showFailToast('Có lỗi xảy ra! Vui lòng thử lại sau');
  }).finally(() => {
    loading.value = false;
  });
};

const forgotPassword = () => {
  showToast('Feature is in development');
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<template>
  <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Tạo tài khoản mới!👋</h1>
  <p class="tw-text-center tw-text-gray-600 tw-mb-6">Kết nối với bạn bè của bạn ngay hôm nay.</p>

  <van-form @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="form.username"
      name="username"
      label="Tên"
      placeholder="Nhập tên của bạn"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.{6,}$/, message: 'Tên phải có ít nhất 6 ký tự' }]"
    />
    <van-field
      v-model="form.email"
      name="email"
      label="Email"
      placeholder="Nhập địa chỉ email của bạn"
      required
      class="tw-mb-4"
      :rules="[{ pattern: /^.+@.+\..+$/, message: 'Địa chỉ Email không đúng định dạng' }]"
    />
    <van-field
      v-model="form.phone"
      name="phone"
      label="Số điện thoại"
      placeholder="Nhập số điện thoại của bạn"
      required
      class="tw-mb-4"
      :rules="[{
        pattern: /^\d{10}$/,
        message: 'Số điện thoại không đúng định dạng',
      }]"
    />
    <van-field
      v-model="form.password"
      name="password"
      label="Mật khẩu"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Nhập mật khẩu của bạn"
      required
      class="tw-mb-4"
      :rules="[{
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/,
        message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số'
      }]"
    >
      <template #button>
        <van-icon
          size="20"
          name="eye-o"
          @click="togglePassword"
          :class="showPassword ? 'tw-text-primary' : ''"
        />
      </template>
    </van-field>
    <van-field
      v-model="form.confirmPassword"
      name="confirmPassword"
      label="Xác nhận mật khẩu"
      :type="showConfirmPassword ? 'text' : 'password'"
      placeholder="Xác nhận mật khẩu của bạn"
      required
      class="tw-mb-4"
      :rules="[{
        validator: (value) => value === form.password,
        message: 'Mật khẩu không khớp'
      }]"
    >
      <template #button>
        <van-icon
          size="20"
          name="eye-o"
          @click="toggleConfirmPassword"
          :class="showConfirmPassword ? 'tw-text-primary' : ''"
        />
      </template>
    </van-field>
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <van-checkbox v-model="form.rememberMe">Ghi nhớ tài khoản</van-checkbox>
      <span class="tw-text-primary text-weight-bold" @click="forgotPassword"></span>
    </div>
    <van-button round block type="primary" native-type="submit" class="tw-mb-4" :loading="loading">Đăng ký</van-button>
  </van-form>
</template>

<style scoped>

</style>
