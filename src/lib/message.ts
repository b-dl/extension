import { Runtime } from 'webextension-polyfill';
import { browser, debug, axios } from '../../util';
import { ws, wsConnect } from './ws';

const sendResponse = (send: (arg: unknown) => void, data: {code: 200 | 400 | 401 | 503, msg?: string, data?: unknown}) => {
  if (send) {
    send(data);
  }
  return browser.runtime.lastError;
};

const onMessage = ((message: ['ping' | 'reconnect', unknown], sender: Runtime.MessageSender, send: (arg: unknown) => void): unknown => {
  debug('background接收消息数据:', { message, sender, send });
  if (!message || message.length <= 0) {
    return sendResponse(send, { code: 400, msg: '消息体错误' });
  }
  if (message[0] === 'reconnect') {
    wsConnect();
  }
  if (ws === null || ws.readyState !== WebSocket.OPEN) {
    return sendResponse(send, { code: 503, msg: '服务不存在' });
  }
  if (message[0] === 'ping') {
    axios('token', 'GET', {}).then((res) => {

    });
  }
  return browser.runtime.lastError;
});

browser.runtime.onMessage.addListener((message: ['ping', unknown], sender: Runtime.MessageSender, send: () => void) => onMessage(message, sender, send) as Promise<unknown>);
