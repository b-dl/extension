import { browser, debug } from '../../util';
import { wsConnect, ws } from './ws';

browser.alarms.onAlarm.addListener((alarm: chrome.alarms.Alarm) => {
  debug('alarms事件触发:', alarm);
  if (alarm.name === 'reconnect' && ws === null) {
    wsConnect();
  }
  return browser.runtime.lastError;
});
