import { defineStore } from 'pinia';
import { Account } from 'src/types/models/Account';

export const useAccountStore = defineStore('account', {
  state: () => ({
    account: {} as Account,
  }),
  actions: {
    setAccount(account: Account) {
      Object.assign(this.account, account);
    },
    clearAccount() {
      this.account = {} as Account;
    },
    getAccount() {
      return this.account;
    }
  },
});
