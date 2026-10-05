<template>
  <i class="vui-icon" :class="`vui-icon--${name}`" :style="style" aria-hidden="true">
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path :d="path" />
    </svg>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 内置少量矢量图标，避免依赖外部图标字体
const ICONS: Record<string, string> = {
  check: 'M406 660l226-226 60 60-286 286-170-170 60-60z',
  close: 'M512 456L316 260l-60 60 196 196-196 196 60 60 196-196 196 196 60-60-196-196 196-196-60-60z',
  info: 'M512 160a352 352 0 100 704 352 352 0 000-704zm0 144a48 48 0 110 96 48 48 0 010-96zm64 448h-128v-256h128z',
  warning: 'M512 96L48 880h928L512 96zm0 288l108 216H404l108-216zM464 656h96v96h-96z',
  arrow: 'M384 704l192-192-192-192 64-64 256 256-256 256z',
  search: 'M448 640a192 192 0 1096-96 192 192 0 00-96 96l160 160 64-64-160-160zM448 576a128 128 0 110-256 128 128 0 010 256z'
}

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    color?: string
  }>(),
  { size: 16 }
)

const path = computed(() => ICONS[props.name] || ICONS.info)
const style = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color || 'inherit'
}))
</script>

<style scoped lang="scss">
.vui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  svg {
    display: block;
  }
}
</style>
