<template>
  <label class="vui-checkbox" :class="{ 'is-checked': modelValue, 'is-disabled': disabled }">
    <input
      type="checkbox"
      class="vui-checkbox__original"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="vui-checkbox__box"><span class="vui-checkbox__tick">✓</span></span>
    <span class="vui-checkbox__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue: boolean; label?: string; disabled?: boolean }>(),
  { label: '', disabled: false }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function onChange() {
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped lang="scss">
.vui-checkbox {
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
  &__box {
    width: 16px;
    height: 16px;
    border: 1px solid var(--vui-border);
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }
  &__tick {
    color: #fff;
    font-size: 12px;
    line-height: 1;
    opacity: 0;
    transform: scale(0.6);
    transition: 0.15s;
  }
  &.is-checked &__box {
    background: var(--vui-primary);
    border-color: var(--vui-primary);
  }
  &.is-checked &__tick {
    opacity: 1;
    transform: scale(1);
  }
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
