import {
  axios, browser, debug, warn,
} from '../../util';
import { ws, wsConnect } from './ws';

browser.windows.onCreated.addListener((window) => {
  debug('创建窗口:', window);
  axios('/token', 'GET').then((res) => {
    console.log(res);
  }).catch((error) => {
    warn('获取token失败：', error);
  });
  if (ws === null || ws.readyState !== WebSocket.OPEN) {
    wsConnect();
  }
  return browser.runtime.lastError;
});

browser.windows.onRemoved.addListener((windowId) => {
  debug('关闭窗口:', windowId);
  if (ws !== null && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
  return browser.runtime.lastError;
});
