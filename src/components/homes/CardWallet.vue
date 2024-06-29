<script setup lang="ts">

</script>

<template>
  <van-card
    class="tw-rounded-xl"
    title="Ví chính"
    desc="Đây là ví chính"
  >
    <template #title>
      <div class="tw-flex tw-justify-between">
        <span class="tw-text-base text-weight-bold">Ví chính</span>

        <q-icon name="edit" size="20px" />
      </div>
    </template>

    <template #thumb>
      <q-icon name="paid" class="icon" size="40px" color="primary" />
    </template>

    <template #bottom>
      <span class="tw-text-sm text-primary">Sao lưu</span>
    </template>
  </van-card>
</template>

<style scoped>

</style>
