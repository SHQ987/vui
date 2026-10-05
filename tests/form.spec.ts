import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../src/components/Form/Form.vue'
import FormItem from '../src/components/Form/FormItem.vue'
import Input from '../src/components/Input/Input.vue'

const Wrapper = {
  components: { Form, FormItem, Input },
  data: () => ({ model: { name: '' } }),
  template: `
    <Form :model="model" :rules="{ name: [{ required: true, message: '请输入名称' }] }">
      <FormItem label="名称" prop="name"><Input v-model="model.name" /></FormItem>
    </Form>
  `
}

describe('Form / FormItem', () => {
  it('必填项为空时校验失败', async () => {
    const wrapper = mount(Wrapper)
    const form = wrapper.findComponent(Form)
    const result = await (form.vm as any).validate()
    expect(result).toBe(false)
    expect(wrapper.find('.vui-form-item__error').exists()).toBe(true)
  })

  it('填写后校验通过', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.find('input').setValue('tom')
    const form = wrapper.findComponent(Form)
    const result = await (form.vm as any).validate()
    expect(result).toBe(true)
  })
})
