<script setup lang="ts">

</script>

<template>
  <div class="loading-page">
    <div class="loading-container">
      <!-- Vòng xoay loading với màu sắc tùy chỉnh -->
      <van-loading size="50px" color="#9C27B0" />
      <p class="loading-text">Xin vui lòng đợi...</p>
    </div>
  </div>
</template>

<style scoped>
/* Tùy chỉnh toàn bộ trang loading */
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Hiệu ứng lung linh cho container loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: pulse 2s infinite;
}

/* Phần chữ văn bản */
.loading-text {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Hiệu ứng lung linh - phồng lên và co lại */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
