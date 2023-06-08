import {
  axios, browser, debug, IsURL,
} from '../../util';
import { wsConnect, ws } from './ws';

browser.tabs.onCreated.addListener((tab) => {
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

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
    debug('Tab更新:', {
      tabId, changeInfo, tab,
    });
    browser.cookies.getAll({ url: tab.url }).then((cookies) => {
      console.log(cookies);
    });
    // axios('/parser', 'POST', {

    // });
  }
});
