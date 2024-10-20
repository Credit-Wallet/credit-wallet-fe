<script setup>
import SelectNetwork from 'components/homes/SelectNetwork.vue';
import ActionNetwork from 'components/homes/ActionNetwork.vue';
import EmptyNetwork from 'components/homes/EmptyNetwork.vue';
import { useNetworkStore } from 'stores/network-store';
import ListMember from 'components/homes/network/ListMember.vue';
import NetworkAPI from 'app/api/network';
import { onMounted, ref } from 'vue';
import { useAccountStore } from 'stores/account-store';
import AccountAPI from 'app/api/account';
import LoadingPage from 'pages/LoadingPage.vue';

defineOptions({
  name: 'HomePage'
});

const networks = useNetworkStore();
const account = useAccountStore();
const isLoading = ref(false);
const refreshing = ref(false);

const fetchAccountAndNetwork = async () => {
  isLoading.value = true;
  console.log(1);
  account.clearAccount();
  await AccountAPI.getProfile().then((response) => {
    account.setAccount(response.result);
    console.log('Account:', account.getAccount);
  }).catch((error) => {
    console.log('Fetch account failed:', error);
  });

  networks.clearNetworks();
  await NetworkAPI.networksOfAccount().then((response) => {
    networks.addNetworks(response.result);
    networks.selectNetworkByAccount(account.getAccount);
  }).catch((error) => {
    console.log('Fetch networks failed:', error);
  });
  isLoading.value = false;
};

const onRefresh = async () => {
  refreshing.value = true;
  await fetchAccountAndNetwork();
  refreshing.value = false;
};

onMounted(() => {
  if (Object.keys(account.getAccount).length === 0) {
    fetchAccountAndNetwork();
  }
});
</script>

<template>
  <q-page>
    <loading-page v-if="isLoading" />
    <div v-else>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div v-if="networks.networkCount === 0" class="tw-p-4">
          <EmptyNetwork />
        </div>

        <div v-else>
          <van-search
            shape="round"
            placeholder="Tìm kiếm"
          />

          <div class="tw-p-4 tw-h-[83vh]">
            <SelectNetwork />

            <ActionNetwork />

            <ListMember class="tw-mt-4" />
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </q-page>
</template>

<style scoped>
:deep(.van-search) {
  padding: 16px 16px 0 16px !important;
}
</style>
