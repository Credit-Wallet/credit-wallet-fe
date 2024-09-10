import { defineStore } from 'pinia';
import { Account } from 'src/types/models/Account';

export const useAccountStore = defineStore('account', {
  state: () => ({
    account: {} as Account,
  }),
  getters: {
    getAccount: (state) => state.account,
  },
  actions: {
    setAccount(account: Account) {
      Object.assign(this.account, account);
    },
  },
});
