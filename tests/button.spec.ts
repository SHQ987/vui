import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/components/Button/Button.vue'

describe('Button', () => {
  it('渲染默认插槽文本', () => {
    const wrapper = mount(Button, { slots: { default: '提交' } })
    expect(wrapper.text()).toContain('提交')
  })

  it('点击触发 click 事件', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('disabled 时不触发 click', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('type 映射到对应 class', () => {
    const wrapper = mount(Button, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('vui-btn--primary')
  })
})
