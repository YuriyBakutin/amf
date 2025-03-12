import { defineStore } from 'pinia'
import type { IAccount } from '@/types/account'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as IAccount[],
    editedAccount: {} as IAccount,
  }),
  actions: {
    putAccount(account: IAccount) {
      const login = account.login

      const existingAccountIndex = this.accounts.findIndex(
        (account) => account.login === login,
      )

      if (existingAccountIndex !== -1) {
        this.accounts[existingAccountIndex] = account

        return
      }

      this.accounts.push(account)
    },
    deleteAccount(login: string) {
      const index = this.accounts.findIndex(
        (account) => account.login === login,
      )

      if (index === -1) {
        console.error(`Аккаунта с логином '${login}' не существует`)

        return
      }

      this.accounts.splice(index, 1)
    },
  },
  getters: {
    getAccountByLogin: (state) => (login: string) =>
      state.accounts.find((account) => account.login === login),
  },
  persist: true, // Saving to localStorage
})
