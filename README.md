# vui

轻量 **Vue3 + TypeScript** 组件库，基于 Vite Library Mode 构建，含类型声明与 Vitest 单测。

## 特性

- 🧩 **14 个核心组件**：Button / Icon / Input / Switch / Modal / Message / Form / FormItem / Select / Checkbox / Radio / Tabs / Tag / Tooltip
- 🔒 **TypeScript 优先**：全程类型约束，构建产物附带 `.d.ts`
- 📦 **Vite Library Mode**：同时产出 ESM + UMD，Vue 作为 peerDependency 不打包
- 🧪 **Vitest 单测**：覆盖交互、v-model、校验、函数式 API 等关键路径
- 🎨 **CSS 变量主题**：统一设计令牌，便于二次定制

## 技术栈

> Vue3 + TypeScript + Vite + vue-tsc + vite-plugin-dts + Vitest + Sass

## 快速开始

```bash
pnpm install          # 安装依赖
pnpm dev              # 本地演示页（http://localhost:5173）
pnpm test             # 运行单元测试
pnpm build            # 构建 lib（dist 含 es/umd + d.ts + style.css）
```

## 使用方式

```ts
// main.ts
import { createApp } from "vue";
import Vui from "vui";
import "vui/dist/style.css";
import App from "./App.vue";

createApp(App).use(Vui).mount("#app");
```

```vue
<template>
  <VuiButton type="primary" @click="Message.success('保存成功')"
    >提交</VuiButton
  >
  <VuiInput v-model="name" clearable />
  <VuiSwitch v-model="on" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VuiButton, VuiInput, VuiSwitch, Message } from "vui";
const name = ref("");
const on = ref(true);
</script>
```

## 组件清单

| 组件                | 说明                                             | 关键技术点                        |
| ------------------- | ------------------------------------------------ | --------------------------------- |
| `Button`            | 6 种类型 / 3 种尺寸 / plain·round·circle·loading | 事件发射、禁用态                  |
| `Icon`              | 内置矢量图标                                     | 计算属性动态 path                 |
| `Input`             | v-model / clearable / show-password              | `update:modelValue` 双向绑定      |
| `Switch`            | v-model / 颜色·文本定制                          | 受控组件                          |
| `Modal`             | 标题/底部插槽、遮罩关闭                          | `Teleport` + `Transition`         |
| `Message`           | `Message.success/error/...` 函数式调用           | 单例挂载 + 响应式列表             |
| `Form` / `FormItem` | 表单校验、实时反馈                               | `provide/inject` + 校验规则       |
| `Select`            | 下拉选择 / 键盘导航 / 点击外部关闭               | `v-model` + 文档级事件            |
| `Checkbox`          | 单个复选、受控                                   | `update:modelValue`               |
| `Radio`             | 单选、分组值                                     | 受控选中态                        |
| `Tabs`              | 标签切换、内容联动                               | `v-model` + 插槽作用域            |
| `Tag`               | 状态标签 / 可关闭                                | 类型映射                          |
| `Tooltip`           | 悬停气泡提示                                     | `mouseenter/leave` + `Transition` |

## 目录结构

```
src/
├── components/        # 14 个组件（各自独立 SFC）
│   ├── Button/
│   ├── Icon/
│   ├── Input/
│   ├── Switch/
│   ├── Modal/
│   ├── Message/        # Message.vue + message.ts（函数式 API）
│   └── Form/           # Form.vue + FormItem.vue + context.ts
├── styles/            # 全局样式 + CSS 变量
├── types.ts           # 公共类型
├── index.ts           # 入口：导出组件 + install
└── playground/        # 本地演示页（dev 用）
tests/                 # Vitest 单测
```

## 发布到 npm

```bash
pnpm build
npm publish --access public
```

## License

MIT
