export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  edpAlert as alert,
  clearAllAlerts,
  edpConfirm as confirm,
  edpPrompt as prompt,
} from './AlertBuilder';
