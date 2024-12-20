import { defineStore } from 'pinia';
import { Wallet } from 'src/types/models/Wallet';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: {} as Wallet,
  }),
  getters: {
    getWallet: (state) => state.wallet,
  },
  actions: {
    setWallet(wallet: Wallet) {
      Object.assign(this.wallet, wallet);
    },
  },
});
