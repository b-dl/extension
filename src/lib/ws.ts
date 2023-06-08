import {
  browser, debug, warn, axios, dlId,
} from '../../util';

export let ws: null | WebSocket = null;

export const wsConnect = () => {
  const reconnect = () => {
    browser.alarms.get('reconnect').then((alarm) => {
      debug('获取alarms事件:', alarm);
      if (alarm === undefined && ws === null) {
        browser.alarms.create('reconnect', { periodInMinutes: 0.1 });
      }
    });
  };

  if (ws === null) {
    axios('/ping', 'HEAD').then((res) => {
      debug('连接ws服务：', res);
      if (res.code === 401) {
        browser.alarms.clear('reconnect');
      }
      if (ws === null && res.code === 200) {
        browser.storage.sync.get(dlId).then((data) => {
          const config = data[dlId];
          if (config) {
            let { host } = config;
            if (host) {
              host = host.replaceAll('http://', '').replaceAll('https://', '');
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
              };
            }
          }
        }).catch((reason) => {
          warn('获取配置失败：', reason);
        });
      }
    }).catch((error: Error) => {
      reconnect();
      warn('连接ws服务失败：', error);
    });
  }
};
