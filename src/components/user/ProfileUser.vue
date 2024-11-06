<script setup>
import { ref } from 'vue';
import avatar from 'assets/images/avatar.jpeg';
import { useAccountStore } from 'stores/account-store';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import AuthAPI from 'app/api/auth';

const accountStore = useAccountStore();

const account = ref(accountStore.getAccount);
const showUpdateImage = ref(false);
const baseUrl = process.env.backend_url;
const selectedImage = ref(baseUrl + account.value.urlAvatar ?? avatar);
const dialogUpdateName = ref(false);
const updateName = ref(account.value.username ?? '');
const formUpdateName = ref(null);
const dialogUpdateEmail = ref(false);
const updateEmail = ref(account.value.email ?? '');
const formUpdateEmail = ref(null);

const actionsUpdateImage = [
  { name: 'Chụp ảnh', value: 0},
  { name: 'Chọn ảnh từ thư viện', value: 1 },
  { name: 'Hủy', value: 2 }
];

// Xử lý khi nhấn vào "Cần cập nhật"
const handleUpdateClick = () => {
  showToast('Đang phát triển');
};

const selectImageFromGallery = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos
  });
  selectedImage.value = image.dataUrl; // Gán URL của ảnh đã chọn
  console.log(image.format);
  // Chuyển đổi base64 thành Blob
  const base64String = image.dataUrl.split(',')[1];
  const byteString = atob(base64String);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: image.format }); // image.format có thể là 'image/png', 'image/jpeg', v.v.

  // Tạo FormData và thêm Blob
  const formData = new FormData();
  formData.append('file', blob, 'avatar.' + image.format); // Đặt tên tệp với phần mở rộng phù hợp

  // Gửi ảnh lên server
  await AuthAPI.uploadAvatar(formData).then((response) => {
    if (response.code === 200) {
      accountStore.updateAvatar(response.result);
      showSuccessToast('Cập nhật ảnh thành công');
    } else {
      showFailToast('Cập nhật ảnh thất bại');
    }
  }).finally(() => {
    showUpdateImage.value = false;
  });
}

const selectImageFromCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera,
  });
  selectedImage.value = image.dataUrl; // Gán URL của ảnh đã chọn
  console.log(image.format);
  // Chuyển đổi base64 thành Blob
  const base64String = image.dataUrl.split(',')[1];
  const byteString = atob(base64String);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: image.format }); // image.format có thể là 'image/png', 'image/jpeg', v.v.

  // Tạo FormData và thêm Blob
  const formData = new FormData();
  formData.append('file', blob, 'avatar.' + image.format); // Đặt tên tệp với phần mở rộng phù hợp

  // Gửi ảnh lên server
  await AuthAPI.uploadAvatar(formData).then((response) => {
    if (response.code === 200) {
      accountStore.updateAvatar(response.result);
      showSuccessToast('Cập nhật ảnh thành công');
    } else {
      showFailToast('Cập nhật ảnh thất bại');
    }
  }).finally(() => {
    showUpdateImage.value = false;
  });
}

const onSelect = (action) => {
  if (action.value === 0) {
    selectImageFromCamera();
  } else if (action.value === 1) {
    selectImageFromGallery();
  } else {
    showUpdateImage.value = false;
  }
};

const onFailed = (error) => {
  showFailToast(error.errors[0].message);
};

const handleConfirmUpdateName = (action) => {
  if (action === 'confirm') {
    formUpdateName.value.validate().then( async () => {
      await AuthAPI.updateUsername(updateName.value).then((response) => {
        if (response.code === 204) {
          accountStore.updateName(updateName.value);
          showSuccessToast('Cập nhật tên thành công');
        } else {
          showFailToast('Cập nhật tên thất bại');
        }
      }).finally(() => {
        dialogUpdateName.value = false;
      })
    }).catch((error) => {
      console.log(error);
    });
  } else {
    dialogUpdateName.value = false;
    updateName.value = account.value.username;
  }
};

const handleConfirmUpdateEmail = (action) => {
  if (action === 'confirm') {
    formUpdateEmail.value.validate().then( async () => {
      await AuthAPI.updateEmail(updateEmail.value).then((response) => {
        if (response.code === 204) {
          accountStore.updateEmail(updateEmail.value);
          showSuccessToast('Cập nhật email thành công');
        } else if (response.code === 400) {
          showFailToast('Email đã được sử dụng');
          updateEmail.value = account.value.email;
        } else {
          showFailToast('Cập nhật email thất bại');
        }
      }).finally(() => {
        dialogUpdateEmail.value = false;
      })
    }).catch((error) => {
      console.log(error);
    });
  } else {
    dialogUpdateEmail.value = false;
    updateEmail.value = account.value.email;
  }
};
</script>

<template>
  <div>
    <!-- Hình ảnh -->
    <van-cell :value="''" is-link @click="showUpdateImage = true">
      <template #title>
        <div class="tw-mt-2">Hình ảnh</div>
      </template>

      <template #right-icon>
        <van-image :src="baseUrl + account.urlAvatar ?? avatar" width="40" height="40" round />
      </template>
    </van-cell>

    <van-cell title="Tên" :value="account.username" is-link @click="dialogUpdateName = true" />

    <van-cell title="Email" :value="account.email" is-link @click="dialogUpdateEmail = true" />

    <van-cell>
      <template #title>
        <div class="update-title">Cập nhật thông tin</div>
        <div class="update-description">
          Theo quy định NHNN, bạn cần cập nhật CCCD/CC gắn chip để tiếp tục giao dịch. Chọn Cập nhật ngay > Xác minh bằng NFC để cập nhật
        </div>
      </template>
      <template #right-icon>
        <span class="update-action" @click="handleUpdateClick">Cần cập nhật</span>
      </template>
    </van-cell>
  </div>

  <van-action-sheet v-model:show="showUpdateImage" :actions="actionsUpdateImage" @select="onSelect" />

  <van-dialog v-model:show="dialogUpdateName" title="Chỉnh sửa tên" show-cancel-button :beforeClose="handleConfirmUpdateName">
    <template #title>
      <span class="tw-text-base text-weight-bold">Chỉnh sửa tên</span>
    </template>

    <template #default>
      <van-form @failed="onFailed" ref="formUpdateName">
          <van-field
            v-model="updateName"
            label="Tên"
            placeholder="Nhập tên"
            required
            :rules="[
              { pattern: /^.{3,}$/, message: 'Tên phải có ít nhất 3 ký tự' },
              { pattern: /^.{1,50}$/, message: 'Tên không được vượt quá 50 ký tự' }
            ]" />
      </van-form>
    </template>
  </van-dialog>

  <van-dialog v-model:show="dialogUpdateEmail" title="Chỉnh sửa tên" show-cancel-button :beforeClose="handleConfirmUpdateEmail">
    <template #title>
      <span class="tw-text-base text-weight-bold">Chỉnh sửa email</span>
    </template>

    <template #default>
      <van-form @failed="onFailed" ref="formUpdateEmail">
        <van-field
          v-model="updateEmail"
          name="email"
          label="Email"
          placeholder="Nhập địa chỉ email của bạn"
          required
          class="tw-mb-4"
          :rules="[{ pattern: /^.+@.+\..+$/, message: 'Địa chỉ Email không đúng định dạng' }]"
        />
      </van-form>
    </template>
  </van-dialog>
</template>

<style scoped>
.update-title {
  font-weight: bold;
}

.update-description {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.update-action {
  color: #ee0a24;
  cursor: pointer;
  font-weight: bold;
}
</style>
