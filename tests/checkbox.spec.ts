import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../src/components/Checkbox/Checkbox.vue'

describe('Checkbox', () => {
  it('默认渲染未选中', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  it('选中态映射 class', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('change 回写 v-model', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('disabled 不响应 change', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, disabled: true } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
