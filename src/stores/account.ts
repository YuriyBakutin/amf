import { defineStore } from 'pinia'
import type { IAccount } from '@/types/account'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as IAccount[],
    editedAccount: {} as IAccount,
  }),
  actions: {
    addAccount(account: IAccount) {
      this.accounts.push(account)
    },
    deleteAccount(login: string) {
      this.accounts.splice(
        this.accounts.findIndex((account) => account.login === login),
        1,
      )
    },
  },
  getters: {},
  persist: true, // Saving to localStorage
})
