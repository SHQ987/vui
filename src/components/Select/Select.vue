<template>
  <div
    ref="selectRef"
    class="vui-select"
    :class="[`vui-select--${size}`, { 'is-disabled': disabled, 'is-open': visible }]"
  >
    <div class="vui-select__input" @click="toggle">
      <span v-if="selectedLabel" class="vui-select__label">{{ selectedLabel }}</span>
      <span v-else class="vui-select__placeholder">{{ placeholder }}</span>
      <span v-if="clearable && selectedLabel && !disabled" class="vui-select__clear" @click.stop="clear">×</span>
      <span class="vui-select__arrow">▾</span>
    </div>
    <transition name="vui-zoom">
      <ul v-if="visible" class="vui-select__dropdown">
        <li
          v-for="(opt, i) in options"
          :key="opt.value"
          class="vui-select__option"
          :class="{ 'is-selected': opt.value === modelValue, 'is-active': i === activeIndex }"
          @click="select(opt)"
          @mouseenter="activeIndex = i"
        >
          {{ opt.label }}
        </li>
        <li v-if="!options.length" class="vui-select__empty">无数据</li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import type { SelectOption } from '../../types'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    options?: SelectOption[]
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    size?: 'large' | 'default' | 'small'
  }>(),
  { options: () => [], placeholder: '请选择', size: 'default' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'change', value: string | number | null): void
}>()

const visible = ref(false)
const activeIndex = ref(-1)
const selectRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue)
  return found ? found.label : ''
})

function toggle() {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    activeIndex.value = props.options.findIndex((o) => o.value === props.modelValue)
  }
}

function select(opt: SelectOption) {
  emit('update:modelValue', opt.value)
  emit('change', opt.value)
  visible.value = false
}

function clear() {
  emit('update:modelValue', null)
  emit('change', null)
}

function onDocClick(e: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    visible.value = false
  }
}

function onKey(e: KeyboardEvent) {
  if (!visible.value) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, props.options.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter' && activeIndex.value >= 0) {
    select(props.options[activeIndex.value])
  } else if (e.key === 'Escape') {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped lang="scss">
.vui-select {
  position: relative;
  display: inline-block;
  width: 200px;
  font-size: 14px;
  color: var(--vui-text);

  &__input {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--vui-border);
    border-radius: var(--vui-radius);
    background: var(--vui-bg);
    cursor: pointer;
    transition: border-color 0.2s;
    &:hover {
      border-color: var(--vui-primary);
    }
  }
  &.is-open &__input {
    border-color: var(--vui-primary);
  }
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    .vui-select__input {
      cursor: not-allowed;
    }
  }
  &--large &__input {
    height: 40px;
  }
  &--small &__input {
    height: 26px;
  }
  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__placeholder {
    flex: 1;
    color: var(--vui-info);
  }
  &__arrow {
    margin-left: 6px;
    color: var(--vui-info);
    transition: transform 0.2s;
  }
  &.is-open &__arrow {
    transform: rotate(180deg);
  }
  &__clear {
    margin-right: 4px;
    color: var(--vui-info);
    cursor: pointer;
  }
  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 4px);
    z-index: 1000;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    max-height: 240px;
    overflow-y: auto;
    background: var(--vui-bg);
    border: 1px solid var(--vui-border);
    border-radius: var(--vui-radius);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }
  &__option {
    padding: 6px 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.is-active {
      background: var(--vui-bg-light);
    }
    &.is-selected {
      color: var(--vui-primary);
      font-weight: 600;
    }
  }
  &__empty {
    padding: 10px;
    text-align: center;
    color: var(--vui-info);
  }
}
</style>
