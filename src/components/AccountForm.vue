<script setup lang="ts">
  import type { IEditedAccount } from '@/types/account'

  const accountStore = useAccountStore()
  const newAccount = ref(false)

  const logins = computed(() =>
    accountStore.accounts.map((account: IEditedAccount) => account.login),
  )
</script>

<template>
  <div class="w-full flex justify-center mt-20">
    <div class="max-w-720 flex flex-col gap-10">
      <div class="flex items-center gap-10">
        <h1 class="font-bold">Учетные записи</h1>
        <van-button
          type="default"
          icon="plus"
          size="small"
          :disabled="newAccount"
          @click="newAccount = true"
        />
      </div>
      <div
        class="w-full flex items-center gap-10 bg-gray-3 text-12 px-6 py-2 mb-10"
      >
        <van-icon name="question-o" size="24" />
        <aside>
          Для указания нескольких меток для одной пары логин/пароль используйте
          разделитель ;
        </aside>
      </div>
      <div
        class="grid grid-cols-[26fr_18fr_26fr_26fr_minmax(24px,24px)] gap-10 w-full in-table place-items-center"
      >
        <div class="contents text-12 text-gray-6">
          <div class="justify-self-start self-end">Метки</div>
          <div class="justify-self-start self-end">Тип записи</div>
          <div class="justify-self-start self-end">Логин</div>
          <div class="justify-self-start self-end">Пароль</div>
          <div></div>
        </div>

        <template v-if="logins.length">
          <AccountFormItem
            v-for="login in logins"
            :key="login"
            :login="login"
          />
        </template>
        <AccountFormItem
          v-if="newAccount"
          @saved="newAccount = false"
          @close="newAccount = false"
        />
        <div v-if="!newAccount && !logins.length">Список аккаунтов пуст</div>
      </div>
    </div>
  </div>
</template>
