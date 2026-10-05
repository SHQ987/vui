<template>
  <div class="vui-input" :class="[`vui-input--${size}`, { 'is-disabled': disabled }]">
    <input
      v-if="!type || type === 'text' || type === 'password'"
      class="vui-input__inner"
      :type="showPwd ? 'text' : type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @change="emit('change', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span v-if="clearable && modelValue" class="vui-input__clear" @click="clear">
      <Icon name="close" :size="14" />
    </span>
    <span v-if="showPwdToggle" class="vui-input__toggle" @click="showPwd = !showPwd">
      {{ showPwd ? '隐藏' : '显示' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../Icon/Icon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: 'text' | 'password'
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    size?: 'large' | 'default' | 'small'
    showPassword?: boolean
  }>(),
  { type: 'text', size: 'default' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'clear'): void
}>()

const showPwd = ref(false)
const showPwdToggle = computed(() => props.showPassword && props.type === 'password')

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped lang="scss">
.vui-input {
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--vui-border);
  border-radius: var(--vui-radius);
  background: var(--vui-bg);
  padding: 0 10px;
  transition: border-color 0.2s;
  &:focus-within {
    border-color: var(--vui-primary);
  }
  &.is-disabled {
    background: var(--vui-bg-light);
    opacity: 0.6;
  }
  &--large {
    height: 40px;
  }
  &--default {
    height: 32px;
  }
  &--small {
    height: 26px;
  }
  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: var(--vui-text);
    height: 100%;
    &::placeholder {
      color: var(--vui-info);
    }
  }
  &__clear,
  &__toggle {
    cursor: pointer;
    color: var(--vui-info);
    font-size: 12px;
    user-select: none;
  }
  &__toggle {
    margin-left: 6px;
  }
}
</style>
