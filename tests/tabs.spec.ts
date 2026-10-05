import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from '../src/components/Tabs/Tabs.vue'

const tabs = [
  { label: '首页', name: 'home' },
  { label: '设置', name: 'setting' }
]

describe('Tabs', () => {
  it('渲染所有标签', () => {
    const wrapper = mount(Tabs, { props: { tabs, modelValue: 'home' } })
    expect(wrapper.findAll('.vui-tabs__item')).toHaveLength(2)
  })

  it('激活项映射 is-active', () => {
    const wrapper = mount(Tabs, { props: { tabs, modelValue: 'setting' } })
    expect(wrapper.findAll('.vui-tabs__item')[1].classes()).toContain('is-active')
  })

  it('点击切换回写 v-model', async () => {
    const wrapper = mount(Tabs, { props: { tabs, modelValue: 'home' } })
    await wrapper.findAll('.vui-tabs__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['setting'])
  })
})
