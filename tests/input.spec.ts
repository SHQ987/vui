import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../src/components/Input/Input.vue'

describe('Input', () => {
  it('v-model 同步输入', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', 'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }) }
    })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('clearable 点击清空', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'abc',
        clearable: true,
        'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v })
      }
    })
    expect(wrapper.find('.vui-input__clear').exists()).toBe(true)
    await wrapper.find('.vui-input__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('disabled 时输入框禁用', () => {
    const wrapper = mount(Input, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
