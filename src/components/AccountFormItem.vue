<script setup lang="ts">
  import type { IEditedAccount } from '@/types/account'

  const account: IEditedAccount = ref({
    mark: '',
    type: '',
    login: '',
    password: '',
  })

  const error = ref({
    type: false,
    login: false,
    password: false,
  })

  const accountIsReady = ref(false)
  const isLdap = computed(() => account.value.type === 'LDAP')
  const typeListOptions = typeList.map((item) => ({ text: item, value: item }))

  const onFocus = (fieldName) => {
    error.value[fieldName] = false
  }

  const onInput = (fieldName: keyof typeof account.value) => {
    validateField(fieldName)
  }

  const validateField = (fieldName: keyof typeof account.value) => {
    if (['login', 'password'].includes(fieldName)) {
      error.value[fieldName] = !account.value[fieldName]
    }

    if (
      (account.value.login && account.value.password) ||
      fieldName === 'type'
    ) {
      error.value.type = account.value.type === ''
    }

    accountIsReady.value =
      account.value.login &&
      (account.value.password || account.value.type === 'LDAP') &&
      !error.value.type

    if (accountIsReady.value) {
      saveAccount()
    }
  }

  const saveAccount = () => {
    console.log('—> saveAccount()')
  }

  const deleteAccount = () => {
    if (!accountIsReady.value) {
      return
    }

    console.log('—> deleteAccount()')
  }
</script>

<template>
  <div
    class="grid grid-cols-[26fr_18fr_26fr_26fr_minmax(24px,24px)] gap-10 w-full h-24 px-20 in-table place-items-center"
  >
    <van-field
      v-model="account.mark"
      placeholder="Метка"
      type="textarea"
      rows="1"
      autosize
      maxlength="50"
      @focus="onFocus('mark')"
      @blur="onInput('mark')"
    />
    <van-dropdown-menu class="w-full" :class="{ error: error.type }">
      <van-dropdown-item
        v-model="account.type"
        :options="typeListOptions"
        @update:modelValue="onInput('mark')"
      />
    </van-dropdown-menu>
    <van-field
      v-model="account.login"
      placeholder="Логин"
      :error="error.login"
      maxlength="100"
      class="border border-solid border-gray-6 rounded-6"
      :class="{ 'col-span-2': isLdap }"
      @focus="onFocus('login')"
      @blur="onInput('login')"
    />
    <van-field
      v-if="!isLdap"
      v-model="account.password"
      placeholder="Пароль"
      :error="error.password"
      maxlength="100"
      class="border border-solid border-gray-6 rounded-6"
      @focus="onFocus('password')"
      @blur="onInput('password')"
    />
    <van-icon
      name="delete-o"
      size="24"
      :class="accountIsReady ? 'text-black cursor-pointer' : 'text-gray-6'"
      @click="deleteAccount"
    />
  </div>
</template>
