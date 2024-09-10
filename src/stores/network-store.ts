import { defineStore } from 'pinia';
import { Network } from 'src/types/models/Network';
import { Account } from 'src/types/models/Account';

export const useNetworkStore = defineStore('networks', {
  state: () => ({
    selectedNetwork: {} as Network,
    networks: [] as Network[],
    members: [] as Account[],
  }),
  getters: {
    networkCount: (state) => state.networks.length,
    countMembers: (state) => state.members.length,
  },
  actions: {
    addNetwork(network : Network) {
      this.networks.push(network);
    },
    addNetworks(networks: Network[]) {
      this.selectedNetwork = networks[0];
      this.networks = networks;
    },
    addMembers(members: Account[]) {
      this.members = members
    },
    selectNetwork(network: Network) {
      this.selectedNetwork = network;
    },
    resetMembers() {
      this.members = [];
    }
  },
});
