export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'default' | 'small'

export interface FormRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  trigger?: 'change' | 'blur'
  validator?: (rule: FormRule, value: unknown) => boolean | Promise<boolean> | string
}

export type FormRules = Record<string, FormRule[]>

export interface FormField {
  prop?: string
  validate: () => Promise<boolean>
}

export interface FormContext {
  model: Record<string, any>
  rules: FormRules
  register: (field: FormField) => void
  validate: () => Promise<boolean>
}

export interface MessageItem {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  content: string
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface TabItem {
  label: string
  name: string | number
}

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
