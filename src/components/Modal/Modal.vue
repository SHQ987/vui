<template>
  <Teleport to="body">
    <Transition name="vui-fade">
      <div v-if="modelValue" class="vui-modal__mask" @click.self="onMaskClick">
        <Transition name="vui-zoom" appear>
          <div v-if="modelValue" class="vui-modal" :style="{ width }">
            <header class="vui-modal__header">
              <slot name="header">
                <span class="vui-modal__title">{{ title }}</span>
              </slot>
              <span class="vui-modal__close" @click="close">✕</span>
            </header>
            <section class="vui-modal__body">
              <slot />
            </section>
            <footer v-if="$slots.footer || showFooter" class="vui-modal__footer">
              <slot name="footer">
                <Button size="small" @click="close">取消</Button>
                <Button size="small" type="primary" @click="confirm">确定</Button>
              </slot>
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from '../Button/Button.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    width?: string
    showFooter?: boolean
    closeOnClickMask?: boolean
  }>(),
  { title: '', width: '420px', showFooter: true, closeOnClickMask: true }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'confirm'): void
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function confirm() {
  emit('confirm')
}
function onMaskClick() {
  if (props.closeOnClickMask) close()
}
</script>

<style scoped lang="scss">
.vui-modal__mask {
  position: fixed;
  inset: 0;
  background: var(--vui-mask);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vui-modal {
  background: var(--vui-bg);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--vui-border);
  }
  &__title {
    font-size: 16px;
    font-weight: 600;
  }
  &__close {
    cursor: pointer;
    color: var(--vui-info);
    &:hover {
      color: var(--vui-primary);
    }
  }
  &__body {
    padding: 20px;
    color: var(--vui-text);
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 12px 20px;
    border-top: 1px solid var(--vui-border);
  }
}
</style>
