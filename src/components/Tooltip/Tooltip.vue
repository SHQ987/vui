<template>
  <span class="vui-tooltip" @mouseenter="show = true" @mouseleave="show = false">
    <slot />
    <transition name="vui-fade">
      <span v-if="show" class="vui-tooltip__pop" :class="`is-${placement}`" role="tooltip">{{ content }}</span>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{ content?: string; placement?: 'top' | 'bottom' | 'left' | 'right' }>(),
  { content: '', placement: 'top' }
)

const show = ref(false)
</script>

<style scoped lang="scss">
.vui-tooltip {
  position: relative;
  display: inline-block;

  &__pop {
    position: absolute;
    z-index: 1100;
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.4;
    color: #fff;
    background: rgba(48, 49, 51, 0.92);
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    &::after {
      content: '';
      position: absolute;
      border: 5px solid transparent;
    }
    &.is-top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 6px;
      &::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: rgba(48, 49, 51, 0.92);
      }
    }
    &.is-bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 6px;
      &::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: rgba(48, 49, 51, 0.92);
      }
    }
  }
}
</style>
