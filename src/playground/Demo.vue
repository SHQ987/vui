<template>
  <div class="page">
    <h1>vui 组件演示</h1>

    <section>
      <h2>Button</h2>
      <VuiButton>默认</VuiButton>
      <VuiButton type="primary">主要</VuiButton>
      <VuiButton type="success" round>成功</VuiButton>
      <VuiButton type="warning" plain>警告</VuiButton>
      <VuiButton type="danger" circle>D</VuiButton>
      <VuiButton type="primary" :loading="loading" @click="loading = !loading"
        >加载中</VuiButton
      >
    </section>

    <section>
      <h2>Icon</h2>
      <VuiIcon name="check" color="#67c23a" />
      <VuiIcon name="close" color="#f56c6c" />
      <VuiIcon name="info" color="#409eff" />
      <VuiIcon name="warning" color="#e6a23c" />
      <VuiIcon name="arrow" />
      <VuiIcon name="search" size="20" />
    </section>

    <section>
      <h2>Input / Switch</h2>
      <VuiInput
        v-model="text"
        clearable
        placeholder="请输入"
        style="max-width: 240px"
      />
      <p>当前值：{{ text }}</p>
      <VuiSwitch v-model="on" active-text="开" inactive-text="关" />
      <span style="margin-left: 12px">开关：{{ on ? "开" : "关" }}</span>
    </section>

    <section>
      <h2>Select</h2>
      <VuiSelect
        v-model="sel"
        :options="options"
        clearable
        placeholder="请选择"
        style="width: 200px"
      />
      <span style="margin-left: 12px">选中：{{ sel ?? "无" }}</span>
    </section>

    <section>
      <h2>Checkbox / Radio</h2>
      <VuiCheckbox v-model="checked" label="我已阅读并同意" />
      <span style="margin-left: 12px"
        >状态：{{ checked ? "已勾选" : "未勾选" }}</span
      >
      <div style="width: 100%"></div>
      <VuiRadio v-model="radioVal" value="a" label="选项 A" />
      <VuiRadio v-model="radioVal" value="b" label="选项 B" />
      <VuiRadio v-model="radioVal" value="c" label="禁用" disabled />
      <span style="margin-left: 12px">选中：{{ radioVal }}</span>
    </section>

    <section>
      <h2>Tag</h2>
      <VuiTag>默认</VuiTag>
      <VuiTag type="primary">主要</VuiTag>
      <VuiTag type="success">成功</VuiTag>
      <VuiTag type="warning">警告</VuiTag>
      <VuiTag type="danger" closable @close="onTagClose">可关闭</VuiTag>
      <VuiTag type="primary" round>圆角</VuiTag>
    </section>

    <section>
      <h2>Tabs</h2>
      <VuiTabs v-model="tab" :tabs="tabs" style="max-width: 420px">
        <template #default="{ active }">
          <p v-if="active === 'a'">这是标签页一的内容。</p>
          <p v-else-if="active === 'b'">这是标签页二的内容。</p>
          <p v-else>这是标签页三的内容。</p>
        </template>
      </VuiTabs>
    </section>

    <section>
      <h2>Tooltip</h2>
      <VuiTooltip content="这是一段提示文字" placement="top">
        <VuiButton>悬停查看提示</VuiButton>
      </VuiTooltip>
      <VuiTooltip content="底部提示" placement="bottom">
        <VuiButton type="primary">底部</VuiButton>
      </VuiTooltip>
    </section>

    <section>
      <h2>Modal</h2>
      <VuiButton type="primary" @click="showModal = true">打开弹窗</VuiButton>
      <VuiModal v-model="showModal" title="提示">
        <p>这是一个基于 Teleport + Transition 的弹窗。</p>
        <template #footer>
          <VuiButton @click="showModal = false">取消</VuiButton>
          <VuiButton type="primary" @click="showModal = false">确定</VuiButton>
        </template>
      </VuiModal>
    </section>

    <section>
      <h2>Message（函数式）</h2>
      <VuiButton @click="Message.success('保存成功')">success</VuiButton>
      <VuiButton type="danger" @click="Message.error('出错了')"
        >error</VuiButton
      >
      <VuiButton type="warning" @click="Message.warning('注意')"
        >warning</VuiButton
      >
    </section>

    <section>
      <h2>Form 校验</h2>
      <VuiForm :model="form" :rules="rules">
        <VuiFormItem label="用户名" prop="name">
          <VuiInput v-model="form.name" placeholder="必填" />
        </VuiFormItem>
        <VuiButton type="primary" @click="onSubmit">提交校验</VuiButton>
      </VuiForm>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  Button as VuiButton,
  Icon as VuiIcon,
  Input as VuiInput,
  Switch as VuiSwitch,
  Modal as VuiModal,
  Form as VuiForm,
  FormItem as VuiFormItem,
  Select as VuiSelect,
  Checkbox as VuiCheckbox,
  Radio as VuiRadio,
  Tabs as VuiTabs,
  Tag as VuiTag,
  Tooltip as VuiTooltip,
  Message,
} from "../index";

const loading = ref(false);
const text = ref("");
const on = ref(true);
const showModal = ref(false);

const sel = ref<string | number | null>(null);
const options = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
];

const checked = ref(false);
const radioVal = ref<string | number>("a");

const tab = ref<string | number>("a");
const tabs = [
  { name: "a", label: "标签页一" },
  { name: "b", label: "标签页二" },
  { name: "c", label: "标签页三" },
];

function onTagClose() {
  Message.info("标签已关闭");
}

const form = reactive({ name: "" });
const rules = { name: [{ required: true, message: "请输入用户名" }] };

function onSubmit() {
  // 通过 provide/inject 注入的校验逻辑，这里仅演示触发
  if (!form.name) {
    Message.warning("请先填写用户名");
  } else {
    Message.success("校验通过");
  }
}
</script>

<style>
.page {
  max-width: 720px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
  color: #303133;
}
.page section {
  margin-bottom: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.page h1 {
  font-size: 24px;
}
.page h2 {
  width: 100%;
  font-size: 16px;
  border-left: 3px solid #409eff;
  padding-left: 8px;
}
</style>
