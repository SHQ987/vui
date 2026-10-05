import type { App, Plugin } from 'vue'

import Button from './components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue'
import Modal from './components/Modal/Modal.vue'
import MessageList from './components/Message/MessageList.vue'
import Message from './components/Message/message'
import Form from './components/Form/Form.vue'
import FormItem from './components/Form/FormItem.vue'
import Select from './components/Select/Select.vue'
import Checkbox from './components/Checkbox/Checkbox.vue'
import Radio from './components/Radio/Radio.vue'
import Tabs from './components/Tabs/Tabs.vue'
import Tag from './components/Tag/Tag.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'

import './styles/index.scss'

export {
  Button,
  Icon,
  Input,
  Switch,
  Modal,
  MessageList,
  Form,
  FormItem,
  Select,
  Checkbox,
  Radio,
  Tabs,
  Tag,
  Tooltip,
  Message
}

export * from './types'
export type { FormContext } from './components/Form/context'

// 组件清单（用于 app.use 全局注册）
const components = [
  Button,
  Icon,
  Input,
  Switch,
  Modal,
  MessageList,
  Form,
  FormItem,
  Select,
  Checkbox,
  Radio,
  Tabs,
  Tag,
  Tooltip
]

const install = (app: App) => {
  components.forEach((comp) => {
    const name = (comp as any).name || (comp as any).__name
    if (name) app.component(name, comp)
  })
}

const Vui: Plugin = { install }

export default Vui
