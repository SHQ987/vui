<template>
  <button
    class="vui-btn"
    :class="[
      `vui-btn--${type}`,
      `vui-btn--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="vui-btn__spin">◌</span>
    <span v-else-if="$slots.icon" class="vui-btn__icon"><slot name="icon" /></span>
    <span class="vui-btn__text"><slot /></span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonType, ButtonSize } from '../../types'

const props = withDefaults(
  defineProps<{
    type?: ButtonType
    size?: ButtonSize
    plain?: boolean
    round?: boolean
    circle?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  { type: 'default', size: 'default' }
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

function handleClick(ev: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', ev)
}
</script>

<style scoped lang="scss">
.vui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid var(--vui-border);
  border-radius: var(--vui-radius);
  background-color: var(--vui-bg);
  color: var(--vui-text);
  padding: 8px 15px;
  font-size: 14px;
  transition: 0.2s;

  &:hover {
    color: var(--vui-primary);
    border-color: var(--vui-primary);
  }
  &--primary {
    background: var(--vui-primary);
    border-color: var(--vui-primary);
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
  &--success {
    background: var(--vui-success);
    border-color: var(--vui-success);
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
  &--warning {
    background: var(--vui-warning);
    border-color: var(--vui-warning);
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
  &--danger {
    background: var(--vui-danger);
    border-color: var(--vui-danger);
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
  &--info {
    background: var(--vui-info);
    border-color: var(--vui-info);
    color: #fff;
    &:hover {
      color: #fff;
      opacity: 0.85;
    }
  }
  &.is-plain {
    background: transparent;
    &.vui-btn--primary {
      color: var(--vui-primary);
    }
    &.vui-btn--success {
      color: var(--vui-success);
    }
    &.vui-btn--warning {
      color: var(--vui-warning);
    }
    &.vui-btn--danger {
      color: var(--vui-danger);
    }
    &.vui-btn--info {
      color: var(--vui-info);
    }
  }
  &.is-round {
    border-radius: 20px;
  }
  &.is-circle {
    border-radius: 50%;
    padding: 8px;
    width: 34px;
    height: 34px;
  }
  &.is-disabled,
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &--large {
    padding: 11px 19px;
    font-size: 15px;
  }
  &--small {
    padding: 5px 11px;
    font-size: 12px;
  }
  &__spin {
    animation: vui-spin 0.8s linear infinite;
  }
}
@keyframes vui-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
