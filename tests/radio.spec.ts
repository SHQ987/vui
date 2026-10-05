import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../src/components/Radio/Radio.vue'

describe('Radio', () => {
  it('选中项映射 is-checked', () => {
    const wrapper = mount(Radio, { props: { modelValue: 'a', value: 'a' } })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('未选中项不映射', () => {
    const wrapper = mount(Radio, { props: { modelValue: 'a', value: 'b' } })
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  it('选中回写 value', async () => {
    const wrapper = mount(Radio, { props: { modelValue: 'a', value: 'b' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('disabled 不回写', async () => {
    const wrapper = mount(Radio, { props: { modelValue: 'a', value: 'b', disabled: true } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
