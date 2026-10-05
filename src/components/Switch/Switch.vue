<template>
  <button
    type="button"
    class="vui-switch"
    :class="[modelValue ? 'is-on' : 'is-off', { 'is-disabled': disabled }]"
    :style="switchStyle"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
  >
    <span class="vui-switch__core">
      <span class="vui-switch__text">{{ modelValue ? activeText : inactiveText }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
    activeColor?: string
    inactiveColor?: string
    activeText?: string
    inactiveText?: string
  }>(),
  { activeText: '', inactiveText: '' }
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void; (e: 'change', value: boolean): void }>()

const switchStyle = computed(() => ({
  backgroundColor: props.modelValue
    ? props.activeColor || 'var(--vui-primary)'
    : props.inactiveColor || 'var(--vui-border)'
}))

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped lang="scss">
.vui-switch {
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 12px;
  height: 24px;
  min-width: 44px;
  position: relative;
  transition: background-color 0.2s;
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &__core {
    position: absolute;
    inset: 2px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    color: #fff;
    font-size: 12px;
  }
  &.is-off &__core {
    justify-content: flex-start;
  }
  &__text {
    line-height: 1;
  }
}
</style>
