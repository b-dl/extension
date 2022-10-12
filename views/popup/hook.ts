import { ref } from 'vue';
import {
  sendMessage, onMessage, debug, warn,
} from '../utils';

export const isConnect = ref(false);

sendMessage<unknown>(['data']).then((res) => {
  debug('popup后台脚本响应数据:', res);
  isConnect.value = res.code === 1;
}).catch((error) => warn(error.message));

onMessage((message: unknown[], sender: chrome.runtime.MessageSender, sendResponse: (res?: unknown) => void) => {
  debug('popup页面后台脚本推送数据:', message);
  isConnect.value = true;
  sendResponse(true);
});
