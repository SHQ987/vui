import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import Message from '../src/components/Message/message'

// Message 内部用原生 createApp 挂载，不受 test-utils 的 transition 打桩影响；
// jsdom 下 <TransitionGroup> 离场节点不会自动移除，故 here 手动清理残留 DOM。
function cleanup() {
  Message.closeAll()
  document.querySelectorAll('.vui-message').forEach((n) => n.remove())
}

describe('Message', () => {
  afterEach(() => cleanup())

  it('success 渲染消息节点', async () => {
    Message.success('保存成功')
    await nextTick()
    const node = document.querySelector('.vui-message--success')
    expect(node).not.toBeNull()
    expect(node?.textContent).toContain('保存成功')
  })

  it('error / warning / info 各自渲染', async () => {
    Message.error('出错了')
    Message.warning('注意')
    Message.info('提示')
    await nextTick()
    expect(document.querySelector('.vui-message--error')).not.toBeNull()
    expect(document.querySelector('.vui-message--warning')).not.toBeNull()
    expect(document.querySelector('.vui-message--info')).not.toBeNull()
  })

  it('closeAll 清空后重新新增只产生一条', async () => {
    Message.success('a')
    Message.success('b')
    await nextTick()
    expect(document.querySelectorAll('.vui-message--success').length).toBe(2)

    // 清空 store（jsdom 无法完成离场动画，手动移除残留节点以模拟真实效果）
    Message.closeAll()
    document.querySelectorAll('.vui-message').forEach((n) => n.remove())

    Message.success('c')
    await nextTick()
    expect(document.querySelectorAll('.vui-message--success').length).toBe(1)
    expect(document.querySelector('.vui-message--success')?.textContent).toContain('c')
  })
})
