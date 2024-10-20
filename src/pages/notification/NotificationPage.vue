<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'ShopeePayUpdates'
});

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  onLoad();
};
</script>

<template>
  <q-page>
    <div>
      <van-cell-group>
        <van-cell title="Cập nhật ShopeePay">
          <template #right-icon>
            <span>Đọc tất cả</span>
          </template>
        </van-cell>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="Finished"
            @load="onLoad"
            class="tw-h-[83vh] tw-overflow-y-auto"
          >
            <van-cell
              v-for="item in list"
              :key="item" :title="item"
            >
              <template #right-icon>
                <span>12:00</span>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-cell-group>
    </div>
  </q-page>
<!--  <van-cell-->
<!--    v-for="(update, index) in shopeePayUpdates"-->
<!--    :key="index"-->
<!--    :title="update.title"-->
<!--    :label="update.content"-->
<!--  >-->
<!--    <template #right-icon>-->
<!--      <span>{{ update.timestamp }}</span>-->
<!--    </template>-->
<!--  </van-cell>-->
</template>

<style scoped>
</style>
