import {
  browser, debug, IsURL,
} from '../utils';
import { wsConnect, ws } from './ws';

browser.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
  debug('Tab创建:', tab);
  if (ws === null || ws.readyState !== WebSocket.OPEN) {
    wsConnect();
  }
  return browser.runtime.lastError;
});

browser.tabs.onActivated.addListener((activeInfo: chrome.tabs.TabActiveInfo) => {
  debug('Tab获得焦点:', activeInfo);
  if (ws === null || ws.readyState !== WebSocket.OPEN) {
    wsConnect();
  }
  return browser.runtime.lastError;
});

browser.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === 'complete' && IsURL(tab.url as string)) {
    debug('Tab更新:', {
      tabId, changeInfo, tab,
    });
  }
});
