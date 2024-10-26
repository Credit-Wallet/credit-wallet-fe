import { defineStore } from 'pinia';
import { Network } from 'src/types/models/Network';
import { Account } from 'src/types/models/Account';
import AccountAPI from 'app/api/account';

export const useNetworkStore = defineStore('networks', {
  state: () => ({
    selectedNetwork: {} as Network,
    networks: [] as Network[],
    members: [] as Account[],
  }),
  getters: {
    networkCount: (state) => state.networks.length,
    countMembers: (state) => state.members.length,
    getSelectedNetwork: (state) => state.selectedNetwork,
  },
  actions: {
    addNetwork(network : Network) {
      this.networks.push(network);
    },
    addNetworks(networks: Network[]) {
      this.networks = networks;
    },
    selectNetworkByAccount(account: Account) {
      this.selectedNetwork = this.networks.find((network: Network) => network.id === account.selectedNetworkId) as Network || this.networks[0];

      const selectedNetworkId = Number(account.selectedNetworkId);
      AccountAPI.selectedNetwork(selectedNetworkId ?? null);
    },
    addMembers(members: Account[]) {
      this.members = members
    },
    selectNetwork(network: Network) {
      this.selectedNetwork = network;
    },
    resetMembers() {
      this.members = [];
    },
    clearNetworks() {
      this.networks = [];
    }
  },
});
