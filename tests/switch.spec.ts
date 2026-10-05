import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../src/components/Switch/Switch.vue'

describe('Switch', () => {
  it('点击切换 v-model', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, 'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }) }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('disabled 时不切换', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false, disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
