import {
  browser, debug, warn, ping, host,
} from '../utils';

export let ws: null | WebSocket = null;

export const wsConnect = () => {
  const reconnect = () => {
    browser.alarms.get('reconnect', (alarm: chrome.alarms.Alarm) => {
      debug('获取alarms事件:', alarm);
      if (alarm === undefined && ws === null) {
        browser.alarms.create('reconnect', { periodInMinutes: 1 });
      }
    });
  };

  if (ws === null) {
    ping().then(() => {
      if (ws === null) {
        ws = new WebSocket(`ws://${host}/ws?tag=bg`, 'wssio.dl.com');

        ws.onclose = (ev: CloseEvent) => {
          ws = null;
          reconnect();
          warn('WS断开:', ev.code);
        };

        ws.onerror = (ev: Event) => {
          ws = null;
          reconnect();
          warn('WS错误:', ev);
        };

        ws.onmessage = (ev: MessageEvent<string>) => {
          debug(ev);
        };

        ws.onopen = () => {
          browser.alarms.clear('reconnect');
          debug('打开WS连接成功');
          browser.runtime.sendMessage(['打开连接', ws]);
        };
      }
    }).catch((error: Error) => {
      reconnect();
      warn(error.message);
    });
  }
};
