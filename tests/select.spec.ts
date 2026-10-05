import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../src/components/Select/Select.vue'

const options = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' }
]

describe('Select', () => {
  it('渲染占位符', () => {
    const wrapper = mount(Select, { props: { options, placeholder: '请选择' } })
    expect(wrapper.find('.vui-select__placeholder').text()).toBe('请选择')
  })

  it('点击展开下拉面板', async () => {
    const wrapper = mount(Select, { props: { options } })
    await wrapper.find('.vui-select__input').trigger('click')
    expect(wrapper.find('.vui-select__dropdown').exists()).toBe(true)
    expect(wrapper.findAll('.vui-select__option')).toHaveLength(2)
  })

  it('选择选项回写 v-model', async () => {
    const wrapper = mount(Select, { props: { options, modelValue: null } })
    await wrapper.find('.vui-select__input').trigger('click')
    await wrapper.findAll('.vui-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['b'])
  })

  it('回显已选 label', () => {
    const wrapper = mount(Select, { props: { options, modelValue: 'a' } })
    expect(wrapper.find('.vui-select__label').text()).toBe('选项一')
  })

  it('disabled 时不展开', async () => {
    const wrapper = mount(Select, { props: { options, disabled: true } })
    await wrapper.find('.vui-select__input').trigger('click')
    expect(wrapper.find('.vui-select__dropdown').exists()).toBe(false)
  })
})
