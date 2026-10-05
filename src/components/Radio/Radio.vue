<template>
  <label class="vui-radio" :class="{ 'is-checked': modelValue === value, 'is-disabled': disabled }">
    <input
      type="radio"
      class="vui-radio__original"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="vui-radio__dot"></span>
    <span class="vui-radio__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue: string | number; value: string | number; label?: string; disabled?: boolean }>(),
  { label: '', disabled: false }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

function onChange() {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped lang="scss">
.vui-radio {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vui-text);
  user-select: none;

  &__original {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  &__dot {
    width: 16px;
    height: 16px;
    border: 1px solid var(--vui-border);
    border-radius: 50%;
    position: relative;
    transition: 0.2s;
    &::after {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background: var(--vui-primary);
      transform: scale(0);
      transition: 0.15s;
    }
  }
  &.is-checked &__dot {
    border-color: var(--vui-primary);
    &::after {
      transform: scale(1);
    }
  }
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
