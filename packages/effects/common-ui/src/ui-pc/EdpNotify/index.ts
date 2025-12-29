import { ElNotification } from 'element-plus';

type NotificationType = 'error' | 'info' | 'success' | 'warning';
export default function EdpNotify(type: NotificationType, message: string) {
  ElNotification({
    duration: 2500,
    message,
    type,
  });
}

export function EdpNotifySuccess(message: string) {
  EdpNotify('success', message);
}

export function EdpNotifyError(message: string) {
  EdpNotify('error', message);
}
export function EdpNotifyInfo(message: string) {
  EdpNotify('info', message);
}
export function EdpNotifyWarning(message: string) {
  EdpNotify('warning', message);
}
