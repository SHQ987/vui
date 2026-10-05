<template>
  <form class="vui-form" @submit.prevent>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import type { FormRules, FormField } from '../../types'

const props = defineProps<{
  model: Record<string, any>
  rules?: FormRules
}>()

const fields: FormField[] = []

const formContext = reactive({
  model: props.model,
  rules: props.rules || {},
  register(field: FormField) {
    fields.push(field)
  },
  async validate(): Promise<boolean> {
    let valid = true
    for (const f of fields) {
      const ok = await f.validate()
      if (!ok) valid = false
    }
    return valid
  }
})

provide('vui-form', formContext)
defineExpose({ validate: formContext.validate })
</script>

<style scoped lang="scss">
.vui-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
