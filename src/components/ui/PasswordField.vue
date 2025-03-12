<script setup lang="ts">
  const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

  const props = defineProps<{
    modelValue: string
    error: boolean
    maxlength: number | string
  }>()

  const modelValue = ref(props.modelValue)
  const inputType = ref('text' as 'text' | 'password')

  const filterInput = (input: string) => {
    return input.replace(/[^a-zA-Z0-9`~!@#$%^&*()_+={}|\[\]\\:;"'<>,.?/]/g, '')
  }

  const onInput = (event: Event) => {
    const inputElement = event.target as HTMLInputElement
    const filteredValue = filterInput(inputElement.value)

    modelValue.value = filteredValue

    emit('update:modelValue', filteredValue)
  }

  const togglePasswordVisibility = () => {
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      modelValue.value = newVal
    },
  )
</script>

<template>
  <div
    class="relative w-full van-field align-middle pl-6 pr-32 text-14 leading-[24px]"
    :class="{ 'van-field--error': error }"
  >
    <input
      :type="inputType"
      v-model="modelValue"
      :maxlength="props.maxlength"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      class="van-field__control h-24 mt-2"
      placeholder="Введите текст"
    />
    <button
      type="button"
      @click="togglePasswordVisibility"
      class="absolute w-18 h-18 right-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
    >
      <van-icon
        :name="inputType === 'password' ? 'closed-eye' : 'eye-o'"
        size="18"
        :color="error ? 'var(--van-danger-color)' : 'var(--van-gray-6)'"
      />
    </button>
  </div>
</template>
