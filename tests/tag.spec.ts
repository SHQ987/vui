import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../src/components/Tag/Tag.vue'

describe('Tag', () => {
  it('渲染插槽内容', () => {
    const wrapper = mount(Tag, { slots: { default: '标签' } })
    expect(wrapper.text()).toContain('标签')
  })

  it('type 映射 class', () => {
    const wrapper = mount(Tag, { props: { type: 'success' } })
    expect(wrapper.classes()).toContain('vui-tag--success')
  })

  it('round 映射 class', () => {
    const wrapper = mount(Tag, { props: { round: true } })
    expect(wrapper.classes()).toContain('is-round')
  })

  it('closable 时点击关闭触发 close 事件', async () => {
    const wrapper = mount(Tag, { props: { closable: true } })
    await wrapper.find('.vui-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
