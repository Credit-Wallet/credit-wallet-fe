<script setup lang="ts">
import { computed, ref } from 'vue';
import qrTest from 'assets/images/qr_test.webp'
import { showToast } from 'vant';

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const showShare = ref(false)
const options = [
  { name: 'WeChat', icon: 'wechat' },
  { name: 'Weibo', icon: 'weibo' },
  { name: 'Link', icon: 'link' },
  { name: 'Poster', icon: 'poster' },
];
const onSelect = (option: { name: string }) => {
  showToast(option.name);
  showShare.value = false;
};
</script>

<template>
  <van-action-sheet v-model:show="show" title="Thêm bạn bè" class="tw-h-[60vh]">
    <template #default>
      <div class="tw-pl-4 tw-pr-4">
        <van-row justify="center" class="tw-my-4">
          <van-col span="15">
            <van-image :src="qrTest" width="250" height="250" class="tw-ml-[-12px]"/>
          </van-col>
        </van-row>
      </div>

      <van-row justify="center">
        <van-col col="12" class="tw-mr-2">
          <van-button class="tw-mb-4" plain @click="showShare = true">
            <q-icon name="share" size="30px" />
            <span>Chia sẻ</span>
          </van-button>
        </van-col>

        <van-col col="12">
          <van-button class="tw-mb-4" plain>
            <q-icon name="save" size="30px" />
            <span>Lưu ảnh</span>
          </van-button>
        </van-col>
      </van-row>
    </template>
  </van-action-sheet>

  <van-share-sheet
    v-model:show="showShare"
    title="Share"
    :options="options"
    @select="onSelect"
    cancel-text="Hủy"
  />
</template>

<style scoped>

</style>
