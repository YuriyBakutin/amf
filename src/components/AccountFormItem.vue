<script setup lang="ts">
  import type { IEditedAccount } from '@/types/account'

  const account: IEditedAccount = ref({
    mark: '',
    type: '',
    login: '',
    password: '',
  })

  const error = ref(true)
  const accountIsReady = ref(true)
  const isLdap = computed(() => account.value.type === 'LDAP')
  const typeListOptions = typeList.map((item) => ({ text: item, value: item }))

  const onFocus = (fieldName) => {
    console.log(`—> onFocus('${fieldName}')`)
  }

  const onBlur = (fieldName) => {
    console.log(`—> onBlur('${fieldName}')`)
  }

  const deleteAccount = () => {
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
      :error="error"
      type="textarea"
      rows="1"
      autosize
      @focus="onFocus('mark')"
      @blur="onBlur('mark')"
    />
    <van-dropdown-menu class="w-full" :class="{ error }">
      <van-dropdown-item v-model="account.type" :options="typeListOptions" />
    </van-dropdown-menu>
    <van-field
      v-model="account.login"
      placeholder="Логин"
      :error="error"
      class="border border-solid border-gray-6 rounded-6"
      :class="{ 'col-span-2': isLdap }"
      @focus="onFocus('login')"
      @blur="onBlur('login')"
    />
    <van-field
      v-if="!isLdap"
      v-model="account.password"
      placeholder="Пароль"
      :error="error"
      class="border border-solid border-gray-6 rounded-6"
      @focus="onFocus('password')"
      @blur="onBlur('password')"
    />
    <van-icon
      name="delete-o"
      size="24"
      :class="accountIsReady ? 'text-black cursor-pointer' : 'text-gray-6'"
      @click="deleteAccount"
    />
  </div>
</template>
