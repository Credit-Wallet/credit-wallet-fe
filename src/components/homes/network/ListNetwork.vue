<script setup lang="ts">
import { ref } from 'vue';

const list = ref<number[]>([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
}
</script>

<template>
  <div class="tw-flex tw-items-center">
    <van-icon name="wap-nav" size="25" />
    <span class="tw-text-base tw-ml-2 tw-mt-1">Danh sách mạng</span>
  </div>
  <div class="tw-max-h-10">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="Finished"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<!--<style scoped>-->

<!--</style>-->
