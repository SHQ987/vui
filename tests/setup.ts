import { config } from '@vue/test-utils'

// jsdom 下 <Transition> 不会触发 transitionend，导致离场节点残留。
// 用 <slot/> 将其打桩为「无动画直出」，保证 v-if 内容随状态同步渲染。
config.global.stubs = {
  transition: { template: '<slot/>' },
  'transition-group': { template: '<slot/>' }
}
