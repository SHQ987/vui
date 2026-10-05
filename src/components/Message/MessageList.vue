<template>
  <Teleport to="body">
    <TransitionGroup name="vui-message-fade" tag="div" class="vui-message-wrap">
      <div v-for="m in state.list" :key="m.id" class="vui-message" :class="`vui-message--${m.type}`">
        <Icon :name="iconOf(m.type)" :size="16" />
        <span class="vui-message__content">{{ m.content }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue'

export interface MessageItem {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  content: string
}

defineProps<{ state: { list: MessageItem[] } }>()

function iconOf(t: MessageItem['type']) {
  return t === 'success' ? 'check' : t === 'error' ? 'close' : t === 'warning' ? 'warning' : 'info'
}
</script>

<style scoped lang="scss">
.vui-message-wrap {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}
.vui-message {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--vui-radius);
  background: var(--vui-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  color: var(--vui-text);
  font-size: 14px;
  border-left: 3px solid var(--vui-info);
  &--success {
    border-color: var(--vui-success);
    color: var(--vui-success);
  }
  &--error {
    border-color: var(--vui-danger);
    color: var(--vui-danger);
  }
  &--warning {
    border-color: var(--vui-warning);
    color: var(--vui-warning);
  }
  &--info {
    border-color: var(--vui-info);
    color: var(--vui-text);
  }
}
</style>
