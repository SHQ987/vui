<template>
  <span class="vui-tag" :class="[`vui-tag--${type}`, { 'is-round': round }]">
    <slot />
    <span v-if="closable" class="vui-tag__close" @click.stop="emit('close')">×</span>
  </span>
</template>

<script setup lang="ts">
import type { TagType } from '../../types'

withDefaults(
  defineProps<{ type?: TagType; round?: boolean; closable?: boolean }>(),
  { type: 'default', round: false, closable: false }
)

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped lang="scss">
.vui-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 9px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: var(--vui-bg-light);
  color: var(--vui-text-light);

  &.is-round {
    border-radius: 10px;
  }
  &--primary {
    color: var(--vui-primary);
    background: color-mix(in srgb, var(--vui-primary) 12%, #fff);
  }
  &--success {
    color: var(--vui-success);
    background: color-mix(in srgb, var(--vui-success) 12%, #fff);
  }
  &--warning {
    color: var(--vui-warning);
    background: color-mix(in srgb, var(--vui-warning) 12%, #fff);
  }
  &--danger {
    color: var(--vui-danger);
    background: color-mix(in srgb, var(--vui-danger) 12%, #fff);
  }
  &__close {
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
  }
}
</style>
