<script setup lang="ts">
  import type { IEditedAccount } from '@/types/account'

  const emit = defineEmits(['saved', 'loginAlreadyExistsError', 'close'])

  const props = withDefaults(
    defineProps<{
      login?: string
    }>(),
    {
      login: '',
    },
  )

  const accountStore = useAccountStore()

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

  const loginAlreadyExists = computed(
    () => !!accountStore.getAccountByLogin(account.value.login) && !props.login,
  )

  const onInput = (fieldName: keyof typeof account.value) => {
    validateField(fieldName)
  }

  const validateField = (fieldName: keyof typeof account.value) => {
    if (fieldName === 'login') {
      error.value.login = !account.value.login || loginAlreadyExists.value

      if (loginAlreadyExists.value) {
        emit('loginAlreadyExistsError')
      }
    }

    if (fieldName === 'password') {
      error.value.password = !account.value.password
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
    accountStore.putAccount({
      ...account.value,
      mark: accountMarkToStoreFormat(account.value.mark),
    })

    emit('saved')
  }

  const deleteAccount = () => {
    if (!accountIsReady.value && !props.login) {
      emit('close')

      return
    }

    accountStore.deleteAccount(account.value.login)
  }

  onBeforeMount(() => {
    if (props.login) {
      const accountFromStore = accountStore.getAccountByLogin(props.login)

      if (accountFromStore) {
        account.value = {
          ...accountFromStore,
          mark: accountFromStore.mark.map((item) => item.text).join('; '),
        }
      }
    }
  })
</script>

<template>
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
  <TextField
    v-model="account.login"
    :error="error.login"
    :disabled="!!props.login"
    maxlength="100"
    :class="{ 'col-span-2': isLdap }"
    @focus="onFocus('login')"
    @blur="onInput('login')"
  />
  <TextField
    v-if="!isLdap"
    v-model="account.password"
    :error="error.password"
    maxlength="100"
    asPassword
    @focus="onFocus('password')"
    @blur="onInput('password')"
  />
  <van-icon
    name="delete-o"
    size="24"
    class="text-black cursor-pointer"
    @click="deleteAccount"
  />
</template>
