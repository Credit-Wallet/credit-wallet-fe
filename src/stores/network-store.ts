import { defineStore } from 'pinia';
import { Network } from 'src/types/models/Network';

export const useNetworkStore = defineStore('networks', {
  state: () => ({
    networks: [] as Network[],
    selectedNetwork: {} as Network,
  }),
  getters: {
    networkCount: (state) => state.networks.length,
  },
  actions: {
    addNetwork(network : Network) {
      this.networks.push(network);
      this.selectedNetwork = network;
    },
  },
});
