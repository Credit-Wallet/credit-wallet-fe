<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true,
  }
});

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
}

const onClickRight = () => {
  console.log('click right');
}
</script>

<template>
  <van-nav-bar
    :title="title"
    left-text="Back"
    right-text="Button"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

  <div>
    <router-view />
  </div>
</template>

<style scoped>

</style>
