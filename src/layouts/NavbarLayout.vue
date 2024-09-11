<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonLeft: {
    type: Boolean,
    default: true,
  },
  buttonRight: {
    type: Boolean,
    default: true,
  },
  leftText: {
    type: String,
    default: 'Back',
  },
  rightText: {
    type: String,
    default: 'Button',
  },
  rightPath: {
    type: String,
    default: '',
  },
});

const router = useRouter();

const onClickLeft = () => {
  router.go(-1);
}

const onClickRight = () => {
  if (props.rightPath) {
    router.push(props.rightPath);
  }
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :left-text="buttonLeft ? leftText : ''"
    :left-arrow="buttonLeft"
    :right-text="buttonRight ? rightText : ''"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

  <div>
    <router-view />
  </div>
</template>

<style scoped>

</style>
