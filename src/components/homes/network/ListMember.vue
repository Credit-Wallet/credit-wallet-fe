<script setup>
import { onMounted, ref } from 'vue';
import AccountAPI from 'app/api/account';
import { useNetworkStore } from 'stores/network-store';
import avatar from 'assets/images/avatar.jpeg';

const loading = ref(false);
const finished = ref(false);
const networks = useNetworkStore();
const baseUrl = process.env.backend_url;

const fetchMembers = async (networkId) => {
  await AccountAPI.getAccountsByNetworkId({ networkId: networkId}).then((response) => {
    networks.addMembers(response.result);
  }).catch((error) => {
    console.log('Fetch networks failed:', error);
  });
};

const onLoad = async () => {
  finished.value = false;
  loading.value = true;
  await fetchMembers(networks.selectedNetwork.id);
  loading.value = false;
  finished.value = true;
};

onMounted(() => {
  onLoad();
});
</script>

<template>
  <div>
    <div class="tw-flex tw-items-center">
      <van-icon name="wap-nav" size="25" />
      <span class="tw-text-base tw-ml-2 tw-mt-1">Danh sách thành viên</span>
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="Finished"
      class="list-members"
    >
      <div v-for="(member, index) in networks.members" :key="index" class="tw-flex tw-items-center tw-py-2 tw-ml-1">
        <van-image
          round
          width="40px"
          height="40px"
          fit="cover"
          :src="member.urlAvatar ? baseUrl + member.urlAvatar : avatar"
        />
        <div class="tw-ml-4 tw-flex-grow">
          <div class="tw-font-medium">{{ member.username }}</div>
          <div class="tw-text-gray-500">{{ member.email }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style scoped>
.list-members {
  max-height: 60vh !important;
  overflow-y: auto;
}
</style>
