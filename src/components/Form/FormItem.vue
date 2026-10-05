<template>
  <div class="vui-form-item" :class="{ 'is-error': error }">
    <label v-if="label" class="vui-form-item__label">{{ label }}</label>
    <div class="vui-form-item__content">
      <slot />
      <div v-if="error" class="vui-form-item__error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import type { FormContext } from './context'

const props = defineProps<{ label?: string; prop?: string }>()

const ctx = inject<FormContext>('vui-form')!
const error = ref('')

function getValue() {
  return props.prop ? ctx.model[props.prop] : undefined
}

async function validate(): Promise<boolean> {
  const rules = (ctx.rules[props.prop || ''] as any[]) || []
  const value = getValue()
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      error.value = rule.message || '该项为必填'
      return false
    }
    if (rule.pattern && value && !rule.pattern.test(String(value))) {
      error.value = rule.message || '格式不正确'
      return false
    }
    if (rule.validator) {
      const res = await rule.validator(rule, value)
      if (res !== true) {
        error.value = typeof res === 'string' ? res : rule.message || '校验未通过'
        return false
      }
    }
  }
  error.value = ''
  return true
}

onMounted(() => {
  ctx.register({ prop: props.prop, validate })
  if (props.prop) {
    watch(getValue, () => {
      if (error.value) validate()
    })
  }
})
</script>

<style scoped lang="scss">
.vui-form-item {
  display: flex;
  align-items: flex-start;
  &__label {
    width: 90px;
    flex-shrink: 0;
    text-align: right;
    padding-right: 12px;
    line-height: 32px;
    color: var(--vui-text);
    font-size: 14px;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__error {
    color: var(--vui-danger);
    font-size: 12px;
    margin-top: 4px;
  }
  &.is-error :deep(.vui-input) {
    border-color: var(--vui-danger);
  }
}
</style>
