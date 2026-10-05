<template>
  <div class="vui-tabs">
    <div class="vui-tabs__nav" role="tablist">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="vui-tabs__item"
        :class="{ 'is-active': tab.name === modelValue }"
        role="tab"
        @click="select(tab.name)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="vui-tabs__content">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabItem } from '../../types'

const props = withDefaults(
  defineProps<{ modelValue: string | number; tabs?: TabItem[] }>(),
  { tabs: () => [] }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

function select(name: string | number) {
  emit('update:modelValue', name)
  emit('change', name)
}
</script>

<style scoped lang="scss">
.vui-tabs {
  width: 100%;

  &__nav {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--vui-border);
  }
  &__item {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    color: var(--vui-text-light);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: 0.2s;
    &:hover {
      color: var(--vui-primary);
    }
    &.is-active {
      color: var(--vui-primary);
      border-bottom-color: var(--vui-primary);
    }
  }
  &__content {
    padding: 16px 4px;
  }
}
</style>
