import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from '../src/components/Tooltip/Tooltip.vue'

describe('Tooltip', () => {
  it('默认不显示气泡', () => {
    const wrapper = mount(Tooltip, { props: { content: '提示' } })
    expect(wrapper.find('.vui-tooltip__pop').exists()).toBe(false)
  })

  it('鼠标进入显示气泡', async () => {
    const wrapper = mount(Tooltip, { props: { content: '提示' } })
    await wrapper.find('.vui-tooltip').trigger('mouseenter')
    const pop = wrapper.find('.vui-tooltip__pop')
    expect(pop.exists()).toBe(true)
    expect(pop.text()).toBe('提示')
  })

  it('鼠标离开隐藏气泡', async () => {
    const wrapper = mount(Tooltip, { props: { content: '提示' } })
    await wrapper.find('.vui-tooltip').trigger('mouseenter')
    await wrapper.find('.vui-tooltip').trigger('mouseleave')
    expect(wrapper.find('.vui-tooltip__pop').exists()).toBe(false)
  })
})
