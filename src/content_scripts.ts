import { ws } from './lib/ws';
import { browser, debug } from '../util';

browser.runtime.onMessage.addListener((message: unknown[], sender: chrome.runtime.MessageSender, sendResponse: (res?: unknown) => void) => {
  debug('content_scripts接收消息数据:', { message, sender, sendResponse });
  if (ws === null || ws.readyState !== WebSocket.OPEN) {
    sendResponse({ code: 0 });
    return browser.runtime.lastError;
  }
  if (message && message.length > 0) {
    if (message[0] === 'data') {
      sendResponse({ code: 1, data: sender });
      return browser.runtime.lastError;
    }
  }
  sendResponse({ code: 0 });
  return browser.runtime.lastError;
});

console.log(browser);
