import { createApp, reactive } from 'vue'
import MessageList, { type MessageItem } from './MessageList.vue'

const state = reactive<{ list: MessageItem[] }>({ list: [] })
let mounted = false
let seed = 1

function ensureMounted() {
  if (mounted) return
  const el = document.createElement('div')
  el.className = 'vui-message-container'
  document.body.appendChild(el)
  createApp(MessageList, { state }).mount(el)
  mounted = true
}

function remove(id: number) {
  const idx = state.list.findIndex((m) => m.id === id)
  if (idx > -1) state.list.splice(idx, 1)
}

function add(type: MessageItem['type'], content: string, duration = 3000) {
  ensureMounted()
  const id = seed++
  state.list.push({ id, type, content })
  if (duration > 0) {
    window.setTimeout(() => remove(id), duration)
  }
}

export const Message = {
  success: (content: string, duration?: number) => add('success', content, duration),
  error: (content: string, duration?: number) => add('error', content, duration),
  warning: (content: string, duration?: number) => add('warning', content, duration),
  info: (content: string, duration?: number) => add('info', content, duration),
  closeAll: () => state.list.splice(0)
}

export type MessageApi = typeof Message
export default Message
